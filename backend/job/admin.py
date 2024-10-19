from django.contrib import admin
from .models import Job

class JobAdmin(admin.ModelAdmin):
    list_display = (
        'title', 
        'author', 
        'post_status', 
        'location', 
        'job_type', 
        'industry',
    )

    list_filter = (
        'post_status', 
        'job_type', 
        'industry',
    )

    search_fields = ('title', 'author_user_username', 'location', 'industry')

    fieldsets = (
        ('Job Information', {
            'fields': ('title', 'description', 'industry', 'author', 'location', 'job_type')
        }),
        ('Status and Posting', {
            'fields': ('post_status',),
        }),
    )

    def get_author_name(self, obj):
        return obj.author.user.username if obj.author and obj.author.user else "N/A"
    
    get_author_name.short_description = 'Author'

admin.site.register(Job, JobAdmin)