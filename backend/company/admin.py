from django.contrib import admin
from .models import Company
from django.contrib import admin
from django.utils.html import format_html

class CompanyAdmin(admin.ModelAdmin):
    list_display = (
        'user', 
        'industry', 
        'phone_number', 
        'location', 
        'company_size', 
        'client_base', 
        'founded', 
        'employees'
    )

    list_filter = (
        'industry', 
        'client_base', 
        'company_size',
    )

    search_fields = ('user_username', 'user_email', 'phone_number', 'registration_id')

    fieldsets = (
        ('Company Information', {
            'fields': ('user', 'industry', 'company_size', 'client_base', 'founded', 'employees')
        }),
        ('Contact Information', {
            'fields': ('phone_number', 'location', 'website')
        }),
        ('Social Links', {
            'fields': ('linkedin', 'twitter', 'facebook')
        }),
        ('Company Documents', {
            'fields': ('registration_id', 'registration_documents', 'registration_documents_preview'),
        }),
        ('Profile Details', {
            'fields': ('logo', 'logo_preview', 'bio'),
        }),
    )

    readonly_fields = ('registration_documents_preview', 'logo_preview')

    def registration_documents_preview(self, obj):
        if obj.registration_documents:
            return format_html('<a href="{}" target="_blank">Download Document</a>', obj.registration_documents.url)
        return "No Document Uploaded"

    def logo_preview(self, obj):
        if obj.logo:
            return format_html('<img src="{}" style="width: 100px; height: auto;" />', obj.logo.url)
        return "No Logo"

    def get_full_name(self, obj):
        return f'{obj.user.first_name} {obj.user.last_name}'
    
    get_full_name.short_description = 'Full Name'

admin.site.register(Company, CompanyAdmin)