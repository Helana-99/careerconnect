from rest_framework import serializers
from .models import Proposal
from individual.models import Individual
from company.models import Company
from job.models import Job
from project.models import Project

class ProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proposal
        fields = ['id', 'individual', 'company', 'job', 'project', 'message', 'cv', 'created_at']

        extra_kwargs = {
            'company': {'allow_null': True},  # Allow company to be null
            'project': {'allow_null': True},  # Allow project to be null
        }


    def validate(self, data):
        individual = data.get('individual')
        company = data.get('company')
        job = data.get('job')
        project = data.get('project')

        # Validate individual and job
        if individual:
            if individual.account_type != 'seeking':
                raise serializers.ValidationError("Only individuals with role 'seeking' can apply for jobs.")
            if not job:
                raise serializers.ValidationError("An individual must apply to a job.")
            if company or project:
                raise serializers.ValidationError("Individuals cannot apply to projects or on behalf of companies.")

        # Validate company and project
        if company:
            if not project:
                raise serializers.ValidationError("A company must apply to a project.")
            if individual or job:
                raise serializers.ValidationError("Companies cannot apply to jobs or on behalf of individuals.")

        return data

def create(self, validated_data):
        # Resolve strings to actual objects
        if 'individual' in validated_data:
            individual_id = validated_data['individual']
            validated_data['individual'] = Individual.objects.get(id=individual_id)

        if 'company' in validated_data and validated_data['company'] is not None:
            company_id = validated_data['company']
            validated_data['company'] = Company.objects.get(id=company_id)

        if 'job' in validated_data:
            job_id = validated_data['job']
            validated_data['job'] = Job.objects.get(id=job_id)

        if 'project' in validated_data and validated_data['project'] is not None:
            project_id = validated_data['project']
            validated_data['project'] = Project.objects.get(id=project_id)

        return super().create(validated_data)