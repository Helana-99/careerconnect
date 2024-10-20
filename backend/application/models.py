from django.db import models
from individual.models import Individual
from company.models import Company
from job.models import Job
from project.models import Project
from django.core.exceptions import ValidationError
import os

# Create your models here.
def validate_pdf(value):
    ext = os.path.splitext(value.name)[1]
    if ext.lower() != '.pdf':
        raise ValidationError("Only PDF files are allowed.")

class Proposal(models.Model):
    individual = models.ForeignKey(Individual, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True)  # Allow null
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True, blank=True)  # Allow null
    message = models.TextField()
    cv = models.FileField(upload_to='cvs/', null=True, blank=True)  # Allow null
    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['individual', 'job'], name='unique_individual_job_proposal_'),
            models.UniqueConstraint(fields=['company', 'project'], name='unique_company_project_proposal_'),
        ]

    def _str_(self):  # Fix the method name from _str_ to __str__
        if self.individual and self.job:
            return f"Proposal by {self.individual.user.first_name} {self.individual.user.last_name} to Job {self.job.title}"
        elif self.company and self.project:
            return f"Proposal by {self.company.user} to Project {self.project.title}"
        return "Proposal (Details not available)"
