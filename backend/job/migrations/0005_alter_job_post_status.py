# Generated by Django 5.1.1 on 2024-10-12 18:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0004_job_author'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='post_status',
            field=models.CharField(choices=[('active', 'Active'), ('disabled', 'Disabled')], default='Active', max_length=100),
        ),
    ]
