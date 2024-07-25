from django.shortcuts import render
from django.views.decorators.http import require_GET
from backend.utils import api_response, read_csv
import logging

logger = logging.getLogger(__name__)

@require_GET
def get_company_details(request, company_id):
    """
    Returns details of a specific company by company_id.
    """
    companies = read_csv('companies.csv')
    if companies is None:
        return api_response(data=None, success=False, status=503, message='Service unavailable. Companies data file not found')
    
    for company in companies:
        if company['company_id'] == company_id:
            return api_response(data=company, message='Data fetched successfully.')
    return api_response(data=None, success=False, status=404, message='Company not found')

@require_GET
def get_locations_by_company(request, company_id):
    """
    Returns all locations for a specific company by company_id.
    """
    companies = read_csv('companies.csv')
    if companies is None:
        return api_response(data=None, success=False, status=503, message='Service unavailable. Companies data file not found')
    
    company_exists = any(company['company_id'] == company_id for company in companies)
    if not company_exists:
        return api_response(data=None, success=False, status=404, message='Company not found')
    
    locations = read_csv('locations.csv')
    if locations is None:
        return api_response(data=None, success=False, status=503, message='Service unavailable. Locations data file not found')
    
    company_locations = [location for location in locations if location['company_id'] == company_id]
    return api_response(data=company_locations, message='Data fetched successfully.')

@require_GET
def get_all_companies(request):
    """
    Returns a list of all companies.
    """
    companies = read_csv('companies.csv')
    if companies is None:
        return api_response(data=None, success=False, status=503, message='Service unavailable. Companies data file not found')
    
    return api_response(data=companies, message='Data fetched successfully.')
