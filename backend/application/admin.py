from django.contrib import admin
from .models import Proposal

admin.site.site_header = 'CareerConnect'
admin.site.site_title = 'CareerConnect'
admin.site.index_title = 'Welcome to the CareerConnect Admin'

class ProposalAdmin(admin.ModelAdmin):
    list_display = ('_str_', 'created_at')
    list_filter = ('created_at', 'individual', 'company', 'job', 'project')
    search_fields = ('message', 'individual_first_name', 'individuallast_name', 'companyuserusername', 'jobtitle', 'project_title')
    fieldsets = (
        (None, {'fields': ('individual', 'company', 'job', 'project', 'message', 'cv')}),
        ('Timestamps', {'fields': ('created_at',)}),
    )
    ordering = ('-created_at',)

admin.site.register(Proposal, ProposalAdmin)