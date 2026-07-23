import React, { useState } from 'react';

// ============================================================
// COMPLETE SERVICES DATA - Based on Real Ethiopian Hospitals
// Everything a user can search for in our hospital database
// ============================================================

const serviceCategories = [
  {
    id: 1,
    icon: 'fa-stethoscope',
    title: 'General Medicine & Primary Care',
    description: 'Everyday healthcare for common illnesses, checkups, and chronic disease management.',
    searchKeywords: ['general medicine', 'primary care', 'family doctor', 'checkup', 'physical exam', 'vaccination', 'flu shot', 'routine care'],
    hospitals: 'Tikur Anbessa, St. Paul\'s, Zewditu, Yekatit 12, Ras Desta, Berhan',
    details: [
      'Routine health checkups and physical examinations',
      'Management of chronic conditions (diabetes, hypertension, asthma)',
      'Vaccinations and immunizations (childhood and adult)',
      'Treatment of common illnesses (fever, flu, infections)',
      'Health screenings (blood pressure, cholesterol, glucose)',
      'Preventive care and health education',
      'Referrals to specialists when needed'
    ]
  },
  {
    id: 2,
    icon: 'fa-heart',
    title: 'Cardiology & Heart Care',
    description: 'Complete heart care from diagnosis to treatment and rehabilitation.',
    searchKeywords: ['cardiology', 'heart', 'heart surgery', 'cardiologist', 'chest pain', 'heart attack', 'ECG', 'heart disease', 'hypertension', 'blood pressure', 'cardiac'],
    hospitals: 'St. Paul\'s, Ayder, Kidane Mihret, Black Lion, Gondar University',
    details: [
      'Cardiac consultations and heart health assessments',
      'ECG (Electrocardiogram) and stress testing',
      'Echocardiography and cardiac imaging',
      'Angiography and cardiac catheterization',
      'Heart surgery (bypass, valve replacement)',
      'Pacemaker implantation',
      'Management of hypertension and heart failure',
      'Cardiac rehabilitation and lifestyle guidance',
      'Emergency heart attack care and stroke prevention'
    ]
  },
  {
    id: 3,
    icon: 'fa-brain',
    title: 'Neurology & Brain Health',
    description: 'Specialized care for brain, nervous system, and neurological disorders.',
    searchKeywords: ['neurology', 'brain', 'stroke', 'epilepsy', 'headache', 'migraine', 'memory', 'dementia', 'alzheimer', 'parkinson', 'nerve', 'neurologist', 'seizure'],
    hospitals: 'St. Paul\'s, Gondar University, Black Lion, Ayder',
    details: [
      'Neurological consultations and brain health assessments',
      'Stroke diagnosis, treatment, and rehabilitation',
      'Epilepsy and seizure disorder management',
      'Headache and migraine treatment',
      'Memory clinics and dementia care',
      'Parkinson\'s disease and movement disorders',
      'Nerve conduction studies and EMG',
      'Brain imaging (CT, MRI) interpretation',
      'Treatment of neurological infections and conditions'
    ]
  },
  {
    id: 4,
    icon: 'fa-baby',
    title: 'Maternity & Child Health',
    description: 'Complete care for mothers, pregnancy, childbirth, and children\'s health.',
    searchKeywords: ['maternity', 'pregnancy', 'childbirth', 'delivery', 'labor', 'postnatal', 'antenatal', 'midwife', 'pediatrics', 'children', 'baby', 'newborn', 'vaccination', 'child doctor'],
    hospitals: 'Yekatit 12, Hayat, Hilina, Pacifica, Zewditu, Tikur Anbessa',
    details: [
      'Prenatal (antenatal) care and pregnancy monitoring',
      'Safe delivery (normal and C-section)',
      'Postnatal care for mother and baby',
      'Newborn care and neonatal services',
      'Childhood vaccinations and immunizations',
      'Pediatric consultations for children of all ages',
      'Growth monitoring and developmental assessments',
      'Treatment of childhood illnesses and infections',
      'Nutrition guidance for mothers and children'
    ]
  },
  {
    id: 5,
    icon: 'fa-bone',
    title: 'Orthopedics & Bone Health',
    description: 'Specialized care for bones, joints, muscles, and sports injuries.',
    searchKeywords: ['orthopedics', 'bone', 'joint', 'fracture', 'broken bone', 'joint pain', 'arthritis', 'knee', 'hip', 'shoulder', 'spine', 'back pain', 'sports injury', 'orthopedic surgeon', 'physiotherapy'],
    hospitals: 'Addis General, Unity, Kadisco, Tikur Anbessa, Gondar University',
    details: [
      'Orthopedic consultations for bone and joint issues',
      'Fracture care and trauma management',
      'Joint replacement surgery (hip, knee, shoulder)',
      'Sports injury treatment and rehabilitation',
      'Spine care and back pain management',
      'Arthritis and joint disease treatment',
      'Physical therapy and rehabilitation services',
      'Pediatric orthopedics for children',
      'Occupational therapy and mobility aids'
    ]
  },
  {
    id: 6,
    icon: 'fa-eye',
    title: 'Ophthalmology & Eye Care',
    description: 'Complete eye care services from routine checkups to advanced surgery.',
    searchKeywords: ['ophthalmology', 'eye', 'vision', 'cataract', 'glaucoma', 'eye surgery', 'laser eye', 'retina', 'eye doctor', 'ophthalmologist', 'optometrist', 'vision correction', 'blindness'],
    hospitals: 'Bethzatha, Lebanon, Yekatit 12, Gondar University',
    details: [
      'Comprehensive eye examinations',
      'Cataract diagnosis and surgery',
      'Glaucoma detection, treatment, and surgery',
      'Retina care and retinal surgery',
      'Vision correction and refractive surgery',
      'Pediatric ophthalmology (children\'s eye care)',
      'Treatment of eye infections and diseases',
      'Diabetic eye screening and management',
      'Low vision rehabilitation and support'
    ]
  },
  {
    id: 7,
    icon: 'fa-tooth',
    title: 'Dental & Oral Health',
    description: 'Complete dental care from routine checkups to specialized procedures.',
    searchKeywords: ['dentistry', 'dental', 'tooth', 'teeth', 'dentist', 'orthodontics', 'braces', 'oral surgery', 'root canal', 'cavity', 'gum disease', 'dental implant', 'wisdom tooth'],
    hospitals: 'Gandhi Memorial, Alem, Yekatit 12, Black Lion',
    details: [
      'Routine dental checkups and cleanings',
      'Fillings and cavity treatment',
      'Root canal therapy',
      'Gum disease treatment',
      'Tooth extractions (including wisdom teeth)',
      'Orthodontics (braces and teeth alignment)',
      'Oral surgery and dental implants',
      'Cosmetic dentistry (veneers, whitening)',
      'Pediatric dentistry (children\'s oral health)'
    ]
  },
  {
    id: 8,
    icon: 'fa-lungs',
    title: 'Pulmonology & Respiratory Care',
    description: 'Expert care for lungs, breathing problems, and respiratory conditions.',
    searchKeywords: ['pulmonology', 'respiratory', 'lungs', 'breathing', 'asthma', 'COPD', 'shortness of breath', 'cough', 'pneumonia', 'tuberculosis', 'TB', 'pulmonary', 'lung specialist', 'respiratory therapist'],
    hospitals: 'St. Paul\'s, Black Lion, Gondar University, Mekelle',
    details: [
      'Respiratory consultations and lung health assessments',
      'Diagnosis and treatment of asthma and COPD',
      'Pneumonia and respiratory infection treatment',
      'Tuberculosis (TB) screening and treatment',
      'Pulmonary function tests (spirometry, lung volume)',
      'Sleep medicine and sleep disorder assessment',
      'Treatment of chronic cough and breathing difficulties',
      'Smoking cessation and lung health education'
    ]
  },
  {
    id: 9,
    icon: 'fa-kidney',
    title: 'Nephrology & Kidney Care',
    description: 'Complete kidney health services including dialysis and transplant.',
    searchKeywords: ['nephrology', 'kidney', 'dialysis', 'kidney disease', 'kidney failure', 'renal', 'kidney transplant', 'hypertension', 'kidney stones', 'nephrologist', 'chronic kidney disease'],
    hospitals: 'St. Paul\'s, Black Lion, Yekatit 12, Gondar University',
    details: [
      'Nephrology consultations and kidney health assessments',
      'Management of chronic kidney disease',
      'Dialysis services (hemodialysis and peritoneal dialysis)',
      'Kidney transplant evaluation and care',
      'Treatment of kidney stones and urinary tract disorders',
      'Management of hypertension related to kidney disease',
      'Diabetic kidney disease care',
      'Fluid and electrolyte management'
    ]
  },
  {
    id: 10,
    icon: 'fa-uterus',
    title: 'Gynecology & Women\'s Health',
    description: 'Specialized healthcare for women at all stages of life.',
    searchKeywords: ['gynecology', 'women health', 'gynecologist', 'menstrual', 'PCOS', 'endometriosis', 'cervical cancer', 'breast health', 'mammogram', 'pap smear', 'fertility', 'menopause', 'ovarian', 'womb'],
    hospitals: 'Yekatit 12, Hilina, Zewditu, Pacifica, Tikur Anbessa',
    details: [
      'Gynecological consultations and annual exams',
      'Cervical cancer screening (Pap smear)',
      'Breast health and mammography',
      'Menstrual disorder treatment (PCOS, endometriosis)',
      'Fertility assessment and treatment',
      'Menopause management and hormonal health',
      'Treatment of gynecological infections',
      'Family planning and contraceptive services',
      'Ovarian and uterine health care'
    ]
  },
  {
    id: 11,
    icon: 'fa-psychology',
    title: 'Mental Health & Psychiatry',
    description: 'Comprehensive mental health and wellness services.',
    searchKeywords: ['mental health', 'psychiatry', 'psychologist', 'counseling', 'therapy', 'depression', 'anxiety', 'stress', 'addiction', 'substance abuse', 'psychiatrist', 'mental wellness', 'trauma', 'PTSD'],
    hospitals: 'Amanuel Mental Health, St. Paul\'s, Black Lion',
    details: [
      'Psychiatric consultations and mental health assessments',
      'Treatment of depression, anxiety, and mood disorders',
      'Addiction and substance abuse treatment',
      'Trauma and PTSD therapy',
      'Family and couples counseling',
      'Child and adolescent mental health',
      'Psychotherapy and behavioral therapy',
      'Stress management and coping skills',
      'Crisis intervention and emergency mental health care'
    ]
  },
  {
    id: 12,
    icon: 'fa-kidney',
    title: 'Surgery & Surgical Services',
    description: 'Advanced surgical care across multiple specialties.',
    searchKeywords: ['surgery', 'surgeon', 'operation', 'surgical', 'general surgery', 'orthopedic surgery', 'heart surgery', 'eye surgery', 'plastic surgery', 'neuro surgery', 'surgical procedure', 'operation theater'],
    hospitals: 'Tikur Anbessa, Kadisco, Gondar University, Black Lion, Addis General',
    details: [
      'General surgery (appendectomy, gallbladder, hernia)',
      'Orthopedic surgery (joint replacement, fracture repair)',
      'Cardiac and thoracic surgery',
      'Neurological surgery (brain and spine)',
      'Ophthalmic surgery (cataract, glaucoma)',
      'Obstetric and gynecological surgery',
      'Urological surgery (kidney, bladder, prostate)',
      'Plastic and reconstructive surgery',
      'Emergency and trauma surgery'
    ]
  }
];

function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div>
      {/* ===== HEADER ===== */}
      <div style={{
        background: 'linear-gradient(135deg, #1A1A1A, #4A4A4A)',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '12px' }}>
            Hospital Services & Specialties
          </h1>
          <p style={{ fontSize: '18px', opacity: '0.9', maxWidth: '700px', margin: '0 auto' }}>
            Everything you can search for in our Ethiopian hospital database.<br />
            Find hospitals that offer the exact care you need.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '0 28px 60px' }}>
        {/* ===== SEARCH KEYWORDS SECTION ===== */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          border: '1px solid #E8E8E8',
          marginBottom: '40px'
        }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px' }}>
            🔍 What Can You Search For?
          </h2>
          <p style={{ color: '#4A4A4A', marginBottom: '16px' }}>
            Use these keywords when searching for hospitals:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {serviceCategories.slice(0, 8).flatMap(cat =>
              cat.searchKeywords.slice(0, 3).map((keyword, idx) => (
                <span key={`${cat.id}-${idx}`} style={{
                  background: '#F5F5F5',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#1A1A1A'
                }}>
                  {keyword}
                </span>
              ))
            )}
            <span style={{
              background: '#E8E8E8',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '500',
              color: '#4A4A4A'
            }}>
              + more...
            </span>
          </div>
        </div>

        {/* ===== SERVICES GRID ===== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '28px'
        }}>
          {serviceCategories.map(service => (
            <div
              key={service.id}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '28px 24px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                border: '1px solid #E8E8E8',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = '#1A1A1A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = '#E8E8E8';
              }}
              onClick={() => setSelectedService(service)}
            >
              {/* Icon */}
              <div style={{
                width: '56px',
                height: '56px',
                background: '#F5F5F5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                fontSize: '24px',
                color: '#1A1A1A'
              }}>
                <i className={`fas ${service.icon}`}></i>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>{service.title}</h3>
              <p style={{ color: '#4A4A4A', marginBottom: '12px', fontSize: '15px' }}>{service.description}</p>

              {/* Search Keywords Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                {service.searchKeywords.slice(0, 4).map((kw, idx) => (
                  <span key={idx} style={{
                    background: '#E8E8E8',
                    padding: '2px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    color: '#4A4A4A'
                  }}>
                    {kw}
                  </span>
                ))}
                {service.searchKeywords.length > 4 && (
                  <span style={{ fontSize: '11px', color: '#8A8A8A' }}>+{service.searchKeywords.length - 4}</span>
                )}
              </div>

              {/* Hospitals that offer this */}
              <div style={{
                padding: '10px 14px',
                background: '#F5F5F5',
                borderRadius: '8px',
                marginBottom: '12px'
              }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#1A1A1A' }}>🏥 Found at: </span>
                <span style={{ fontSize: '12px', color: '#4A4A4A' }}>{service.hospitals}</span>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); toggleDropdown(service.id); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1A1A1A',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {activeDropdown === service.id ? 'Hide Details ▲' : 'View Full Details ▼'}
              </button>

              {/* Dropdown Content */}
              {activeDropdown === service.id && (
                <div
                  style={{
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid #E8E8E8'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {service.details.map((item, idx) => (
                      <li key={idx} style={{
                        padding: '6px 0',
                        borderBottom: '1px solid #F5F5F5',
                        fontSize: '14px',
                        color: '#4A4A4A',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span style={{ color: '#1A1A1A' }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ===== BOTTOM INFORMATION ===== */}
        <div style={{
          background: '#F5F5F5',
          borderRadius: '16px',
          padding: '32px',
          marginTop: '40px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>
            📋 Not sure what to search?
          </h3>
          <p style={{ color: '#4A4A4A', maxWidth: '600px', margin: '0 auto' }}>
            Enter your symptoms, condition, or the type of doctor you need into the search bar
            on the Find Hospitals page. Our database of 50+ Ethiopian hospitals has you covered.
          </p>
        </div>

        {/* ===== SERVICE POPUP MODAL ===== */}
        {selectedService && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
            onClick={() => setSelectedService(null)}
          >
            <div
              style={{
                background: 'white',
                borderRadius: '24px',
                padding: '40px',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'auto',
                position: 'relative',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedService(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '20px',
                  background: 'none',
                  border: 'none',
                  fontSize: '28px',
                  cursor: 'pointer',
                  color: '#4A4A4A'
                }}
              >
                ×
              </button>

              <div style={{
                width: '64px',
                height: '64px',
                background: '#F5F5F5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                color: '#1A1A1A',
                marginBottom: '16px'
              }}>
                <i className={`fas ${selectedService.icon}`}></i>
              </div>

              <h2 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '8px' }}>
                {selectedService.title}
              </h2>
              <p style={{ color: '#4A4A4A', marginBottom: '16px', fontSize: '16px' }}>
                {selectedService.description}
              </p>

              <div style={{
                padding: '12px 16px',
                background: '#F5F5F5',
                borderRadius: '8px',
                marginBottom: '16px'
              }}>
                <span style={{ fontSize: '13px', fontWeight: '600' }}>🏥 Available at: </span>
                <span style={{ fontSize: '13px', color: '#4A4A4A' }}>{selectedService.hospitals}</span>
              </div>

              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>What's included:</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {selectedService.details.map((item, idx) => (
                  <li key={idx} style={{
                    padding: '8px 0',
                    borderBottom: '1px solid #F5F5F5',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '14px',
                    color: '#4A4A4A'
                  }}>
                    <span style={{ color: '#1A1A1A', fontWeight: '700' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <h4 style={{ fontSize: '16px', fontWeight: '600', margin: '20px 0 12px' }}>🔍 Search Keywords:</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedService.searchKeywords.map((kw, idx) => (
                  <span key={idx} style={{
                    background: '#F5F5F5',
                    padding: '4px 14px',
                    borderRadius: '16px',
                    fontSize: '13px',
                    color: '#1A1A1A'
                  }}>
                    {kw}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedService(null)}
                style={{
                  marginTop: '24px',
                  width: '100%',
                  padding: '14px',
                  background: '#1A1A1A',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Services;