from django.contrib import admin
from .models import Project

class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        'title', 
        'author', 
        'post_status', 
        'industry', 
        'budget', 
        'deadline',
    )

    list_filter = (
        'post_status', 
        'industry', 
        'budget',
    )

    search_fields = ('title', 'author_user_username', 'industry')

    fieldsets = (
        ('Project Information', {
            'fields': ('title', 'description', 'industry', 'author', 'budget', 'deadline')
        }),
        ('Status and Posting', {
            'fields': ('post_status',),
        }),
    )

    def get_author_name(self, obj):
        return obj.author.user.username if obj.author and obj.author.user else "N/A"
    
    get_author_name.short_description = 'Author'

admin.site.register(Project, ProjectAdmin)