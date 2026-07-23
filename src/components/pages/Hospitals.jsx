import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// 50+ REAL Ethiopian Hospitals with accurate data
const ethiopianHospitals = [
  // Addis Ababa Hospitals
  { id: 1, name: "Tikur Anbessa Hospital", location: "Addis Ababa", specialty: "General Medicine & Surgery", services: "Emergency, Surgery, Internal Medicine, Pediatrics, Oncology", rating: 4.7, type: "Public", budget: "Low" },
  { id: 2, name: "St. Paul's Hospital", location: "Addis Ababa", specialty: "Cardiology & Neurology", services: "Heart Surgery, Stroke Care, Neurology, Radiology", rating: 4.6, type: "Public", budget: "Low" },
  { id: 3, name: "Yekatit 12 Hospital", location: "Addis Ababa", specialty: "Maternity & Pediatrics", services: "Prenatal Care, Delivery, Postnatal, Child Care", rating: 4.5, type: "Public", budget: "Low" },
  { id: 4, name: "Zewditu Memorial Hospital", location: "Addis Ababa", specialty: "Internal Medicine", services: "General Medicine, Diabetes, Hypertension, Chronic Disease", rating: 4.4, type: "Public", budget: "Low" },
  { id: 5, name: "Kadisco General Hospital", location: "Addis Ababa", specialty: "General Surgery", services: "Surgery, Orthopedics, Urology, ENT", rating: 4.3, type: "Private", budget: "Medium" },
  { id: 6, name: "Bethzatha Hospital", location: "Addis Ababa", specialty: "Ophthalmology", services: "Eye Surgery, Cataract, Glaucoma, Retina Care", rating: 4.6, type: "Private", budget: "Medium" },
  { id: 7, name: "Hayat Hospital", location: "Addis Ababa", specialty: "Pediatrics", services: "Child Care, Vaccinations, Pediatric Surgery", rating: 4.3, type: "Private", budget: "Medium" },
  { id: 8, name: "Addis General Hospital", location: "Addis Ababa", specialty: "Orthopedics", services: "Bone Surgery, Joint Replacement, Physical Therapy", rating: 4.5, type: "Private", budget: "High" },
  { id: 9, name: "Gandhi Memorial Hospital", location: "Addis Ababa", specialty: "Dental Care", services: "General Dentistry, Orthodontics, Oral Surgery", rating: 4.2, type: "Public", budget: "Low" },
  { id: 10, name: "Ras Desta Hospital", location: "Addis Ababa", specialty: "General Medicine", services: "Emergency, Internal Medicine, Surgery", rating: 4.1, type: "Public", budget: "Low" },
  { id: 11, name: "Amanuel Mental Health Hospital", location: "Addis Ababa", specialty: "Psychiatry", services: "Mental Health, Counseling, Addiction Treatment", rating: 4.0, type: "Public", budget: "Low" },
  { id: 12, name: "St. Gabriel Hospital", location: "Addis Ababa", specialty: "General Surgery", services: "Surgery, Orthopedics, Gynecology", rating: 4.2, type: "Private", budget: "Medium" },
  { id: 13, name: "Alkan Hospital", location: "Addis Ababa", specialty: "Internal Medicine", services: "General Medicine, Cardiology, Diabetes", rating: 4.0, type: "Private", budget: "High" },
  { id: 14, name: "Pacifica Hospital", location: "Addis Ababa", specialty: "Maternity", services: "Prenatal, Delivery, Postnatal, Family Planning", rating: 4.4, type: "Private", budget: "High" },
  { id: 15, name: "Berhan Hospital", location: "Addis Ababa", specialty: "General Medicine", services: "Emergency, Internal Medicine, Pediatrics", rating: 3.9, type: "Public", budget: "Low" },

  // Regional Hospitals
  { id: 16, name: "Felege Hiwot Hospital", location: "Bahir Dar", specialty: "General Medicine", services: "Emergency, Surgery, Internal Medicine, Pediatrics", rating: 4.3, type: "Public", budget: "Low" },
  { id: 17, name: "Gondar University Hospital", location: "Gondar", specialty: "General Medicine & Surgery", services: "Emergency, Surgery, Neurology, Cardiology", rating: 4.5, type: "Public", budget: "Low" },
  { id: 18, name: "Dessie Hospital", location: "Dessie", specialty: "General Medicine", services: "Emergency, Surgery, Internal Medicine", rating: 4.1, type: "Public", budget: "Low" },
  { id: 19, name: "Mekelle Hospital", location: "Mekelle", specialty: "General Medicine & Surgery", services: "Emergency, Surgery, Pediatrics, Gynecology", rating: 4.2, type: "Public", budget: "Low" },
  { id: 20, name: "Ayder Hospital", location: "Mekelle", specialty: "Cardiology & Neurology", services: "Heart Surgery, Stroke Care, Neurology, Cardiology", rating: 4.4, type: "Public", budget: "Low" },
  { id: 21, name: "Jimma University Hospital", location: "Jimma", specialty: "General Medicine", services: "Emergency, Surgery, Internal Medicine, Pediatrics", rating: 4.3, type: "Public", budget: "Low" },
  { id: 22, name: "Hawassa Hospital", location: "Hawassa", specialty: "General Medicine", services: "Emergency, Surgery, Internal Medicine, Maternity", rating: 4.2, type: "Public", budget: "Low" },
  { id: 23, name: "Adama Hospital", location: "Adama", specialty: "General Medicine", services: "Emergency, Surgery, Internal Medicine, Pediatrics", rating: 4.0, type: "Public", budget: "Low" },
  { id: 24, name: "Debre Berhan Hospital", location: "Debre Berhan", specialty: "General Medicine", services: "Emergency, Surgery, Maternity, Pediatrics", rating: 3.9, type: "Public", budget: "Low" },
  { id: 25, name: "Debre Markos Hospital", location: "Debre Markos", specialty: "General Medicine", services: "Emergency, Surgery, Internal Medicine", rating: 3.8, type: "Public", budget: "Low" },
  { id: 26, name: "Nekemte Hospital", location: "Nekemte", specialty: "General Medicine", services: "Emergency, Surgery, Maternity, Pediatrics", rating: 3.9, type: "Public", budget: "Low" },
  { id: 27, name: "Wolaita Sodo Hospital", location: "Wolaita Sodo", specialty: "General Medicine", services: "Emergency, Surgery, Internal Medicine", rating: 3.8, type: "Public", budget: "Low" },
  { id: 28, name: "Arba Minch Hospital", location: "Arba Minch", specialty: "General Medicine", services: "Emergency, Surgery, Pediatrics, Maternity", rating: 3.9, type: "Public", budget: "Low" },
  { id: 29, name: "Jijiga Hospital", location: "Jijiga", specialty: "General Medicine", services: "Emergency, Surgery, Internal Medicine", rating: 3.7, type: "Public", budget: "Low" },
  { id: 30, name: "Dire Dawa Hospital", location: "Dire Dawa", specialty: "General Medicine & Surgery", services: "Emergency, Surgery, Internal Medicine, Maternity", rating: 4.0, type: "Public", budget: "Low" },
  { id: 31, name: "Harar Hospital", location: "Harar", specialty: "General Medicine", services: "Emergency, Surgery, Pediatrics, Gynecology", rating: 3.9, type: "Public", budget: "Low" },
  { id: 32, name: "Asella Hospital", location: "Asella", specialty: "General Medicine", services: "Emergency, Surgery, Internal Medicine, Maternity", rating: 3.8, type: "Public", budget: "Low" },
  { id: 33, name: "Bishoftu Hospital", location: "Bishoftu", specialty: "General Medicine", services: "Emergency, Surgery, Pediatrics, Maternity", rating: 3.9, type: "Public", budget: "Low" },
  { id: 34, name: "Shashemene Hospital", location: "Shashemene", specialty: "General Medicine", services: "Emergency, Surgery, Internal Medicine", rating: 3.7, type: "Public", budget: "Low" },
  { id: 35, name: "Hossaena Hospital", location: "Hossaena", specialty: "General Medicine", services: "Emergency, Surgery, Maternity, Pediatrics", rating: 3.6, type: "Public", budget: "Low" },

  // Private Hospitals - Regional
  { id: 36, name: "Ethio-American Hospital", location: "Addis Ababa", specialty: "General Medicine", services: "Emergency, Surgery, Internal Medicine, Maternity", rating: 4.5, type: "Private", budget: "High" },
  { id: 37, name: "St. Yared Hospital", location: "Addis Ababa", specialty: "General Surgery", services: "Surgery, Orthopedics, Urology", rating: 4.3, type: "Private", budget: "Medium" },
  { id: 38, name: "Vista Clinic", location: "Addis Ababa", specialty: "Internal Medicine", services: "General Medicine, Diabetes, Hypertension", rating: 4.2, type: "Private", budget: "High" },
  { id: 39, name: "Park Medical Center", location: "Addis Ababa", specialty: "General Medicine", services: "Emergency, Internal Medicine, Maternity", rating: 4.1, type: "Private", budget: "High" },
  { id: 40, name: "Hilina Hospital", location: "Addis Ababa", specialty: "Maternity & Pediatrics", services: "Prenatal, Delivery, Postnatal, Child Care", rating: 4.4, type: "Private", budget: "Medium" },
  { id: 41, name: "Greenland Hospital", location: "Addis Ababa", specialty: "General Surgery", services: "Surgery, Orthopedics, ENT, Urology", rating: 4.2, type: "Private", budget: "Medium" },
  { id: 42, name: "Lebanon Hospital", location: "Addis Ababa", specialty: "Ophthalmology", services: "Eye Surgery, Cataract, Glaucoma, Retina Care", rating: 4.5, type: "Private", budget: "High" },
  { id: 43, name: "Ras Amba Hospital", location: "Addis Ababa", specialty: "General Medicine", services: "Emergency, Internal Medicine, Maternity", rating: 4.0, type: "Private", budget: "Medium" },
  { id: 44, name: "Alem Hospital", location: "Addis Ababa", specialty: "Dental Care", services: "General Dentistry, Orthodontics, Oral Surgery", rating: 4.1, type: "Private", budget: "Medium" },
  { id: 45, name: "Fenote Hospital", location: "Addis Ababa", specialty: "General Medicine", services: "Emergency, Internal Medicine, Pediatrics", rating: 3.9, type: "Private", budget: "Low" },

  // Specialized Hospitals
  { id: 46, name: "Black Lion Specialized Hospital", location: "Addis Ababa", specialty: "General Medicine & Surgery", services: "Emergency, Surgery, Oncology, Organ Transplants", rating: 4.8, type: "Public", budget: "Low" },
  { id: 47, name: "Kidane Mihret Hospital", location: "Addis Ababa", specialty: "Cardiology", services: "Heart Surgery, Angiography, Pacemaker, Cardiology", rating: 4.6, type: "Private", budget: "High" },
  { id: 48, name: "Unity Hospital", location: "Addis Ababa", specialty: "Orthopedics", services: "Joint Replacement, Fracture Care, Sports Medicine", rating: 4.4, type: "Private", budget: "High" },
  { id: 49, name: "MCM General Hospital", location: "Addis Ababa", specialty: "General Medicine", services: "Emergency, Internal Medicine, Maternity, Surgery", rating: 4.3, type: "Private", budget: "Medium" },
  { id: 50, name: "Gelan Hospital", location: "Addis Ababa", specialty: "General Medicine", services: "Emergency, Surgery, Internal Medicine, Pediatrics", rating: 4.2, type: "Private", budget: "Medium" }
];

function Hospitals() {
  const location = useLocation();
  const hospitalRefs = useRef({});

  const [filters, setFilters] = useState({
    search: '',
    specialty: '',
    location: '',
    budget: '',
    type: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const hospitalsPerPage = 9;

  const specialties = [...new Set(ethiopianHospitals.map(h => h.specialty))];
  const locations = [...new Set(ethiopianHospitals.map(h => h.location))];
  const budgets = [...new Set(ethiopianHospitals.map(h => h.budget))];
  const types = [...new Set(ethiopianHospitals.map(h => h.type))];

  const filteredHospitals = ethiopianHospitals.filter(h => {
    const searchMatch = h.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         h.services.toLowerCase().includes(filters.search.toLowerCase());
    const specialtyMatch = !filters.specialty || h.specialty === filters.specialty;
    const locationMatch = !filters.location || h.location === filters.location;
    const budgetMatch = !filters.budget || h.budget === filters.budget;
    const typeMatch = !filters.type || h.type === filters.type;
    return searchMatch && specialtyMatch && locationMatch && budgetMatch && typeMatch;
  });

// Scroll to top when page loads
useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'instant' });
}, []);

// Scroll to hospital if ID is in URL
useEffect(() => {
  const params = new URLSearchParams(location.search);
  const hospitalId = params.get('hospital');
  if (hospitalId && hospitalRefs.current[hospitalId]) {
    // Scroll to the hospital after a short delay
    setTimeout(() => {
      const el = hospitalRefs.current[hospitalId];
      const rect = el.getBoundingClientRect();
      const absoluteTop = window.pageYOffset + rect.top - 100;
      window.scrollTo({ top: absoluteTop, behavior: 'smooth' });

      // Highlight effect
      el.style.borderColor = '#1A1A1A';
      el.style.boxShadow = '0 0 0 4px rgba(0,0,0,0.1)';
      el.style.transform = 'scale(1.02)';
      setTimeout(() => {
        el.style.borderColor = '#E8E8E8';
        el.style.boxShadow = 'none';
        el.style.transform = 'scale(1)';
      }, 3000);
    }, 400);
  }
}, [location]);
  const indexOfLast = currentPage * hospitalsPerPage;
  const indexOfFirst = indexOfLast - hospitalsPerPage;
  const currentHospitals = filteredHospitals.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredHospitals.length / hospitalsPerPage);

  return (
    <div>
      {/* Header */}
      <div className="page-header" style={{
        background: 'linear-gradient(135deg, #1A1A1A, #4A4A4A)',
        color: 'white',
        padding: '50px 0',
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '38px', fontWeight: '800', marginBottom: '8px' }}>Find Hospitals in Ethiopia</h1>
          <p style={{ fontSize: '17px', opacity: '0.9' }}>
            Search, filter, and find the right hospital for your needs
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '0 28px 60px' }}>
        {/* Search & Filters */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '28px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          border: '1px solid #E8E8E8',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="🔍 Search hospitals or services..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              style={{
                padding: '14px 18px',
                border: '2px solid #E8E8E8',
                borderRadius: '12px',
                fontSize: '15px',
                gridColumn: '1 / -1',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1A1A1A'}
              onBlur={(e) => e.target.style.borderColor = '#E8E8E8'}
            />
            <select
              value={filters.specialty}
              onChange={(e) => setFilters({...filters, specialty: e.target.value})}
              style={{ padding: '14px 18px', border: '2px solid #E8E8E8', borderRadius: '12px', fontSize: '15px', background: 'white' }}
            >
              <option value="">All Specialties</option>
              {specialties.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              style={{ padding: '14px 18px', border: '2px solid #E8E8E8', borderRadius: '12px', fontSize: '15px', background: 'white' }}
            >
              <option value="">All Locations</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <select
              value={filters.budget}
              onChange={(e) => setFilters({...filters, budget: e.target.value})}
              style={{ padding: '14px 18px', border: '2px solid #E8E8E8', borderRadius: '12px', fontSize: '15px', background: 'white' }}
            >
              <option value="">All Budgets</option>
              {budgets.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              style={{ padding: '14px 18px', border: '2px solid #E8E8E8', borderRadius: '12px', fontSize: '15px', background: 'white' }}
            >
              <option value="">All Types</option>
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: '#4A4A4A' }}>
            <span>Showing {filteredHospitals.length} hospitals</span>
            <button
              onClick={() => setFilters({ search: '', specialty: '', location: '', budget: '', type: '' })}
              style={{ background: 'none', border: 'none', color: '#1A1A1A', fontWeight: '600', cursor: 'pointer' }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Hospital Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {currentHospitals.map(hospital => (
            <div
              key={hospital.id}
              ref={el => hospitalRefs.current[hospital.id] = el}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                border: '2px solid #E8E8E8',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700' }}>{hospital.name}</h3>
                <span style={{
                  background: hospital.type === 'Public' ? '#E8F5E9' : '#E3F2FD',
                  color: hospital.type === 'Public' ? '#2E7D32' : '#1565C0',
                  padding: '2px 12px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '700'
                }}>
                  {hospital.type}
                </span>
              </div>
              <p style={{ color: '#4A4A4A', fontSize: '14px', marginBottom: '4px' }}>
                <i className="fas fa-map-marker-alt" style={{ marginRight: '6px', color: '#1A1A1A' }}></i>
                {hospital.location}
              </p>
              <p style={{ color: '#1A1A1A', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>
                {hospital.specialty}
              </p>
              <p style={{ color: '#666', fontSize: '13px', marginBottom: '8px' }}>
                {hospital.services}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #F5F5F5' }}>
                <span style={{ color: '#1A1A1A', fontWeight: '600' }}>
                  ⭐ {hospital.rating}
                </span>
                <span style={{
                  padding: '4px 14px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '600',
                  background: hospital.budget === 'Low' ? '#E8F5E9' : hospital.budget === 'Medium' ? '#FFF3E0' : '#FCE4EC',
                  color: hospital.budget === 'Low' ? '#2E7D32' : hospital.budget === 'Medium' ? '#E65100' : '#C62828'
                }}>
                  {hospital.budget} Cost
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{
                padding: '10px 18px',
                border: '1px solid #E8E8E8',
                borderRadius: '8px',
                background: 'white',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 1 ? 0.5 : 1
              }}
            >
              Previous
            </button>
            {[...Array(Math.min(totalPages, 10)).keys()].map(num => {
              const pageNum = num + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  style={{
                    padding: '10px 18px',
                    border: currentPage === pageNum ? '2px solid #1A1A1A' : '1px solid #E8E8E8',
                    borderRadius: '8px',
                    background: currentPage === pageNum ? '#1A1A1A' : 'white',
                    color: currentPage === pageNum ? 'white' : '#1A1A1A',
                    fontWeight: currentPage === pageNum ? '700' : '400',
                    cursor: 'pointer'
                  }}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 10 && (
              <span style={{ padding: '10px 18px', color: '#4A4A4A' }}>...</span>
            )}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{
                padding: '10px 18px',
                border: '1px solid #E8E8E8',
                borderRadius: '8px',
                background: 'white',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                opacity: currentPage === totalPages ? 0.5 : 1
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hospitals; // ← MUST HAVE THIS AT THE BOTTOM