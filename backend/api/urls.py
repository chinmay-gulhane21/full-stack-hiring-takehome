from django.urls import path
from . import views

urlpatterns = [
    path('companies/all', views.get_all_companies, name='get_all_companies'),
    path('companies/<company_id>/', views.get_company_details, name='get_company_details'),
    path('companies/<company_id>/locations/', views.get_locations_by_company, name='get_locations_by_company'),
]
