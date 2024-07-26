import pytest
from django.test import TestCase, Client
from django.urls import reverse
from unittest.mock import patch

class CompanyAPITestCase(TestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.client = Client()
        
        # Mock data for companies
        cls.company_data = [
            {'company_id': '1', 'name': 'Acme Corp', 'address': '123 Acme St'},
            {'company_id': '2', 'name': 'Globex Corporation', 'address': '456 Globex St'}
        ]
        
        # Mock data for locations
        cls.location_data = [
            {'location_id': '1', 'company_id': '1', 'address': '789 Acme Location'},
            {'location_id': '2', 'company_id': '1', 'address': '1011 Acme Location'},
            {'location_id': '3', 'company_id': '2', 'address': '1213 Globex Location'},
            {'location_id': '4', 'company_id': '2', 'address': '1415 Globex Location'}
        ]
        
        # Locations for company with ID 1
        cls.company_1_locations = [
            {'location_id': '1', 'company_id': '1', 'address': '789 Acme Location'},
            {'location_id': '2', 'company_id': '1', 'address': '1011 Acme Location'}
        ]

    @patch('backend.utils.read_csv')
    def test_get_all_companies(self, mock_read_csv):
        """
        Test get_all_companies API endpoint.
        """
        # Mock read_csv
        mock_read_csv.return_value = self.company_data
        
        url = reverse('get_all_companies')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['data'], self.company_data)

    @patch('backend.utils.read_csv')
    def test_get_company_details(self, mock_read_csv):
        """
        Test get_company_details API endpoint.
        """
        # Mock read_csv
        mock_read_csv.side_effect = lambda x: self.company_data if x == 'companies.csv' else None
        
        # Test valid company ID
        url = reverse('get_company_details', args=['1'])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['data'], self.company_data[0])

        # Test invalid company ID
        url = reverse('get_company_details', args=['3'])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)

if __name__ == '__main__':
    pytest.main()
