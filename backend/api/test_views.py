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
            {
                "company_id": "1",
                "name": "TechNova Solutions",
                "address": "123 Innovation Drive, San Francisco, CA 94105",
                "latitude": "37.7749",
                "longitude": "-122.4194"
            },
            {
                "company_id": "2",
                "name": "GreenLeaf Enterprises",
                "address": "456 Sustainability Ave, Portland, OR 97201",
                "latitude": "45.5155",
                "longitude": "-122.6789"
            },
            {
                "company_id": "3",
                "name": "OceanView Logistics",
                "address": "789 Harbor Blvd, Miami, FL 33131",
                "latitude": "25.7617",
                "longitude": "-80.1918"
            },
            {
                "company_id": "4",
                "name": "MountainPeak Investments",
                "address": "101 Summit Road, Denver, CO 80202",
                "latitude": "39.7392",
                "longitude": "-104.9903"
            },
            {
                "company_id": "5",
                "name": "UrbanEdge Retail",
                "address": "202 City Center Plaza, Chicago, IL 60601",
                "latitude": "41.8781",
                "longitude": "-87.6298"
            },
            {
                "company_id": "6",
                "name": "SunriseMed Innovations",
                "address": "303 Health Lane, Boston, MA 02110",
                "latitude": "42.3601",
                "longitude": "-71.0589"
            },
            {
                "company_id": "7",
                "name": "ElectraTech Industries",
                "address": "404 Circuit Street, Austin, TX 78701",
                "latitude": "30.2672",
                "longitude": "-97.7431"
            },
            {
                "company_id": "8",
                "name": "AgroFuture Corporation",
                "address": "505 Harvest Road, Des Moines, IA 50309",
                "latitude": "41.5868",
                "longitude": "-93.625"
            },
            {
                "company_id": "9",
                "name": "QuantumLeap AI",
                "address": "606 Algorithm Alley, Seattle, WA 98101",
                "latitude": "47.6062",
                "longitude": "-122.3321"
            },
            {
                "company_id": "10",
                "name": "EcoHarbor Resorts",
                "address": "707 Beachfront Drive, Honolulu, HI 96815",
                "latitude": "21.3069",
                "longitude": "-157.8583"
            }
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
        url = reverse('get_company_details', args=['3'])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['data'], self.company_data[2])

        # Test invalid company ID
        url = reverse('get_company_details', args=['11'])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)

if __name__ == '__main__':
    pytest.main()
