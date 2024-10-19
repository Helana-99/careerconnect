# Generated by Django 5.1.1 on 2024-10-18 22:22

import application.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0002_initial'),
        ('company', '0001_initial'),
        ('individual', '0002_experience'),
        ('job', '0001_initial'),
        ('project', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='proposal',
            name='cv',
            field=models.FileField(blank=True, null=True, upload_to='cvs/', validators=[application.models.validate_pdf]),
        ),
        migrations.AddConstraint(
            model_name='proposal',
            constraint=models.UniqueConstraint(fields=('individual', 'job'), name='unique_individual_job_proposal_'),
        ),
        migrations.AddConstraint(
            model_name='proposal',
            constraint=models.UniqueConstraint(fields=('company', 'project'), name='unique_company_project_proposal_'),
        ),
    ]
