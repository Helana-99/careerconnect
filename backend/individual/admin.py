from django.contrib import admin
from .models import Individual



class IndividualAdmin(admin.ModelAdmin):
    list_display = ('user', 'gender', 'account_type', 'age')
    search_fields = ('user__username', 'first_name', 'last_name', 'national_id')
    list_filter = ('gender', 'account_type')

    def age(self, obj):
        return obj.calculate_age()

    age.short_description = 'Age'

admin.site.register(Individual, IndividualAdmin)