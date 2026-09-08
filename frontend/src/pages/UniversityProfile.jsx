import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiGlobe, FiMail, FiPhone, FiMapPin, FiBookOpen, FiExternalLink, FiSave, FiCheckCircle, FiFileText } from 'react-icons/fi';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const UNIVERSITY_INFO = {
  1: {
    name: 'University of Ghana',
    description: 'Founded in 1948 as the University College of the Gold Coast, the University of Ghana is the oldest and largest public university in Ghana. Established on the recommendation of the Asquith Commission, it was originally an affiliate of the University of London. The university achieved full independence in 1961 and was renamed the University of Ghana. Located in Legon, Accra, the campus sits on 121 metres of elevation — "Legon" derives from Ga words meaning "hill of knowledge." With over 53,000 undergraduates and 6,600 postgraduates, UG is Ghana\'s premier research-intensive university.',
    accreditation: 'Fully accredited by the Ghana Tertiary Education Commission (GTEC). Member of the Association of African Universities, Association of Commonwealth Universities, and the Worldwide Universities Network. Ranked among the top universities in Africa by Times Higher Education.',
    admissions: 'Admissions are conducted annually for undergraduate and postgraduate programmes. WASSCE applicants need credits (A1-C6) in Core English, Core Mathematics, and three elective subjects relevant to their chosen programme. The university operates a semester system. Applications are made through the UG admissions portal at admissions.ug.edu.gh. UG also offers Mature Entry, Distance Education, and International Admissions.',
    facilities: 'The Legon Campus houses the central administration, five traditional halls (Legon, Volta, Commonwealth, Akuafo, and Mensah Sarbah), the Balme Library, the Great Hall, the Noguchi Memorial Institute for Medical Research, and the University of Ghana Medical Centre. Additional campuses include the Korle-Bu Campus (health sciences) and the Accra City Campus.',
    student_life: 'UG offers a vibrant campus life with over 100 student organisations, religious societies, cultural groups, and the SRC. The campus hosts events, sporting competitions, and academic conferences. The university has produced notable alumni including heads of state, judges, academics, and business leaders.',
    source_url: 'https://www.ug.edu.gh',
  },
  2: {
    name: 'Kwame Nkrumah University of Science and Technology (KNUST)',
    description: 'KNUST was established in 1951 as the Kumasi College of Technology and opened officially on 22 January 1952 with 200 transferred teacher training students. It was renamed and granted university status in 1961, dedicated to science and technology education in Africa. The university is situated on a 16 square-kilometre campus about 7 km from the centre of Kumasi. KNUST is the largest university in Ghana by student population with over 60,000 students. The university is home to the MasterCard Foundation Scholars Program and received QAA International Institutional Accreditation.',
    accreditation: 'Fully accredited by GTEC. Received QAA (Quality Assurance Agency, UK) International Institutional Accreditation. Member of the Association of African Universities. Programmes are reviewed by external examiners and moderators to maintain high academic standards.',
    admissions: 'WASSCE applicants need credits in Core English, Core Mathematics, Integrated Science, and three relevant elective subjects. KNUST publishes cut-off points annually. Applications are made through the KNUST admissions portal. The university offers Undergraduate, Postgraduate, Distance Learning, and International admissions. Prospective students should apply via admissions.knust.edu.gh.',
    facilities: 'The campus features six halls of residence (Queen Elizabeth II, Unity, Independence, Republic, University, and Africa), modern lecture halls, a university library, the Great Hall, research centres including the Kumasi Centre for Collaborative Research (KCCR), a university hospital, and sports facilities. The campus is known for its beautiful tropical landscaping and modern architecture.',
    student_life: 'KNUST has a dynamic campus life with student associations, the National Union of Ghana Students (NUGS), hall activities, cultural festivals, and the KNUST SRC. The university hosts the annual KNUST Week celebration, Techno-Cultural Festival, and various academic and social events. Student housing is available on-campus with additional hostels nearby.',
    source_url: 'https://www.knust.edu.gh',
  },
  3: {
    name: 'University of Cape Coast (UCC)',
    description: 'Established in October 1962 as a University College affiliated with the University of Ghana, UCC became a fully independent university on 1 October 1971 through the University of Cape Coast Act, 1971 (Act 390). Originally mandated to train professional teachers for Ghana\'s second-cycle institutions, UCC has expanded into diverse academic disciplines. Ranked as the Best University in Ghana by Times Higher Education, UCC is a public collegiate university located in the historic town of Cape Coast with a rare seafront campus overlooking the Atlantic Ocean. It currently has over 85,000 students and alumni worldwide.',
    accreditation: 'Fully accredited by GTEC. Ranked #1 in Ghana by Times Higher Education. The university offers over 525 active programmes across undergraduate, postgraduate, and doctoral levels. Accredited by relevant professional bodies including the Ghana Medical and Dental Council and the Ghana Institute of Engineers.',
    admissions: 'Admissions are based on WASSCE or equivalent qualifications. Applicants need credits in Core English, Core Mathematics, and three relevant elective subjects. UCC publishes its own admission requirements and cut-off points. Applications are made through apply.ucc.edu.gh. UCC also offers Distance Education and International admissions.',
    facilities: 'UCC campus features modern lecture halls, the university library, laboratories, ICT centres, a medical centre, sports facilities, and residential halls. The campus sits on a hill with views of the Atlantic Ocean, near the Cape Coast Castle UNESCO World Heritage Site.',
    student_life: 'UCC students enjoy a vibrant campus life with the SRC, hall activities, cultural events, religious societies, and sports competitions. The university hosts academic conferences, workshops, and community engagement programmes. Cape Coast is a historic city with beaches, castles, and cultural landmarks.',
    source_url: 'https://www.ucc.edu.gh',
  },
  4: {
    name: 'University of Education, Winneba (UEW)',
    description: 'The University of Education, Winneba was established in 1992 to promote teacher education and professional development. UEW operates across multiple campuses including Winneba (North, South, and Central), Ajumako, and Kumasi. The university is committed to producing professionally trained teachers and educational leaders for Ghana and the sub-region. UEW offers programmes in education, arts, sciences, and applied sciences.',
    accreditation: 'Fully accredited by GTEC. Programmes are approved by the National Council for Curriculum and Assessment (NaCCA) and relevant professional bodies. UEW has received multiple awards for its contribution to education in Ghana.',
    admissions: 'Applicants need WASSCE credits in Core English, Core Mathematics, and relevant elective subjects. UEW publishes admission requirements for each programme. Applications are made through the UEW admissions portal. The university offers Undergraduate, Postgraduate, Sandwich, and Distance Education programmes.',
    facilities: 'UEW has multiple campuses with lecture halls, libraries, laboratories, ICT centres, sports facilities, and student housing. The main campus is in Winneba, Central Region. The university has a hospital, a printing press, and various research centres.',
    student_life: 'UEW students participate in SRC activities, hall festivals, cultural events, sports, and academic conferences. The university has a vibrant community with students from across Ghana. The Winneba校区 is known for its calm and conducive learning environment.',
    source_url: 'https://www.uew.edu.gh',
  },
  5: {
    name: 'Ghana Institute of Management and Public Administration (GIMPA)',
    description: 'GIMPA was established in 1961 as a joint project between the Ghana Government and the United Nations Special Fund. It was originally a training institute for senior public servants. GIMPA has grown into a leading management development institution offering programmes in business administration, public administration, law, and technology. The institute is known for its executive education and professional development programmes.',
    accreditation: 'Fully accredited by GTEC. Recognised as a centre of excellence in management and public administration education. GIMPA programmes are designed to meet international standards.',
    admissions: 'Admissions are based on WASSCE or equivalent qualifications, with relevant work experience for some programmes. Applications are made through the GIMPA admissions portal. The institute offers Undergraduate, Postgraduate, and Executive Education programmes.',
    facilities: 'GIMPA has a modern campus in Accra with lecture halls, a library, computer labs, a cafeteria, and conference facilities. The institute also has regional centres across Ghana.',
    student_life: 'GIMPA has a professional student community with executive education participants, full-time students, and working professionals. The institute hosts conferences, seminars, and workshops throughout the year.',
    source_url: 'https://www.gimpa.edu.gh',
  },
  6: {
    name: 'Koforidua Technical University',
    description: 'Koforidua Technical University was established as a polytechnic and converted to a technical university in 2016 under the Technical Universities Act, 2016 (Act 922). The university offers programmes in engineering, applied sciences, business, and humanities with a focus on practical and industry-relevant education.',
    accreditation: 'Fully accredited by GTEC as a Technical University. Programmes are designed to meet industry standards and are approved by relevant professional bodies.',
    admissions: 'WASSCE applicants need credits in Core English, Core Mathematics, and relevant elective subjects. Technical university programmes may have specific practical requirements. Applications are made through the university admissions portal.',
    facilities: 'The university has modern workshops, laboratories, lecture halls, a library, and ICT facilities. The campus is located in Koforidua, the Eastern Regional capital.',
    student_life: 'Students participate in SRC activities, technical competitions, industrial attachments, and community projects. The university emphasises hands-on practical training alongside theoretical knowledge.',
    source_url: 'https://www.ktu.edu.gh',
  },
  7: {
    name: 'University of Ghana',
    description: 'Founded in 1948 as the University College of the Gold Coast, the University of Ghana is the oldest and largest public university in Ghana. Established on the recommendation of the Asquith Commission, it was originally an affiliate of the University of London. The university achieved full independence in 1961 and was renamed the University of Ghana. Located in Legon, Accra, the campus sits on 121 metres of elevation — "Legon" derives from Ga words meaning "hill of knowledge." With over 53,000 undergraduates and 6,600 postgraduates, UG is Ghana\'s premier research-intensive university.',
    accreditation: 'Fully accredited by the Ghana Tertiary Education Commission (GTEC). Member of the Association of African Universities, Association of Commonwealth Universities, and the Worldwide Universities Network. Ranked among the top universities in Africa by Times Higher Education.',
    admissions: 'Admissions are conducted annually for undergraduate and postgraduate programmes. WASSCE applicants need credits (A1-C6) in Core English, Core Mathematics, and three elective subjects relevant to their chosen programme. The university operates a semester system. Applications are made through the UG admissions portal at admissions.ug.edu.gh. UG also offers Mature Entry, Distance Education, and International Admissions.',
    facilities: 'The Legon Campus houses the central administration, five traditional halls (Legon, Volta, Commonwealth, Akuafo, and Mensah Sarbah), the Balme Library, the Great Hall, the Noguchi Memorial Institute for Medical Research, and the University of Ghana Medical Centre. Additional campuses include the Korle-Bu Campus (health sciences) and the Accra City Campus.',
    student_life: 'UG offers a vibrant campus life with over 100 student organisations, religious societies, cultural groups, and the SRC. The campus hosts events, sporting competitions, and academic conferences. The university has produced notable alumni including heads of state, judges, academics, and business leaders.',
    source_url: 'https://www.ug.edu.gh',
  },
  8: {
    name: 'University of Mines and Technology (UMaT)',
    description: 'UMaT was established in 2004 as a public university in Tarkwa, Western Region. Originally founded as the School of Mines in 1960 under the University of Science and Technology, it became a fully autonomous university in 2004. UMaT is Ghana\'s premier university for mining and geological sciences, offering programmes in mining engineering, geological engineering, petroleum engineering, and related fields.',
    accreditation: 'Fully accredited by GTEC. Programmes are designed to meet the needs of the mining and extractive industries. UMaT has partnerships with international mining companies and institutions.',
    admissions: 'WASSCE applicants need credits in Core English, Core Mathematics, Integrated Science, and elective subjects including Elective Mathematics, Physics, and Chemistry for engineering programmes. Applications are made through the UMaT admissions portal.',
    facilities: 'UMaT has a campus in Tarkwa with mining simulation labs, geological laboratories, workshops, a library, and residential facilities. The university has partnerships with mining companies for field training.',
    student_life: 'Students participate in mining field trips, industry placements, technical conferences, and the UMaT SRC. The university has a close-knit community with a focus on practical industry preparation.',
    source_url: 'https://www.umat.edu.gh',
  },
  9: {
    name: 'University for Development Studies (UDS)',
    description: 'UDS was established in 1992 in Tamale, Northern Region, as Ghana\'s first public university in the northern part of the country. The university was founded to promote development in northern Ghana and beyond through teaching, research, and community engagement. UDS offers programmes in agriculture, health sciences, education, applied sciences, and earth resources.',
    accreditation: 'Fully accredited by GTEC. The university has received recognition for its community-based education model and development-focused research.',
    admissions: 'WASSCE applicants need credits in Core English, Core Mathematics, and relevant elective subjects. UDS operates a trimester system. Applications are made through the UDS admissions portal.',
    facilities: 'UDS has campuses in Tamale (Navrongo, Nyankpala, and Dungu), with lecture halls, laboratories, libraries, and residential facilities. The university has a community-based education model that integrates field work.',
    student_life: 'UDS students participate in community development projects, field attachments, cultural events, and SRC activities. The university promotes a service-learning approach where students engage with local communities.',
    source_url: 'https://www.uds.edu.gh',
  },
  10: {
    name: 'Accra Technical University (ATU)',
    description: 'ATU was established in 1949 as a technical institute and converted to a polytechnic in 1993, then to a technical university in 2016 under the Technical Universities Act, 2016 (Act 922). ATU offers programmes in engineering, applied sciences, business, and built environment with emphasis on practical and industry-oriented education.',
    accreditation: 'Fully accredited by GTEC as a Technical University. Programmes are designed to meet industry standards.',
    admissions: 'WASSCE applicants need credits in Core English, Core Mathematics, and relevant elective subjects. BTech programmes require specific subject combinations. Applications are made through the ATU admissions portal.',
    facilities: 'ATU has modern engineering workshops, laboratories, lecture halls, a library, and ICT facilities. The campus is located in the heart of Accra.',
    student_life: 'Students participate in industrial attachments, technical projects, SRC activities, and community service. ATU emphasises practical skills development and entrepreneurship.',
    source_url: 'https://atu.edu.gh',
  },
  11: {
    name: 'Central University',
    description: 'Central University was established in 1988 as a private university by the Central Methodist Church. It is one of the largest private universities in Ghana, offering programmes in business, law, arts, sciences, and theology. The university has campuses in Accra (Miamba) and Kumasi.',
    accreditation: 'Fully accredited by GTEC. Programmes are approved by relevant professional bodies including the Ghana Legal Council for law programmes.',
    admissions: 'WASSCE applicants need credits in Core English, Core Mathematics, and relevant elective subjects. Applications are made through the Central University admissions portal.',
    facilities: 'The university has modern lecture halls, a library, computer labs, a chapel, and student housing. Campuses are located in Accra and Kumasi.',
    student_life: 'Students participate in religious activities, cultural events, SRC activities, and community service. The university has a values-based education approach.',
    source_url: 'https://www.central.edu.gh',
  },
  12: {
    name: 'Valley View University',
    description: 'Valley View University was established in 1978 as a private university by the Adventist Church. It is one of the oldest private universities in Ghana, offering programmes in business, education, humanities, science, and technology.',
    accreditation: 'Fully accredited by GTEC. The university follows the Seventh-day Adventist educational philosophy.',
    admissions: 'WASSCE applicants need credits in Core English, Core Mathematics, and relevant elective subjects. Applications are made through the VVU admissions portal.',
    facilities: 'The university has campuses in Accra (Oyibi) and Kumasi, with lecture halls, a library, laboratories, and residential facilities.',
    student_life: 'Students participate in religious activities, community service, cultural events, and SRC activities. The university emphasises holistic development.',
    source_url: 'https://www.vvu.edu.gh',
  },
  13: {
    name: 'All Nations University (ANU)',
    description: 'All Nations University was established in 1988 as a private university in Koforidua. The university offers programmes in business administration, computer science, engineering, and education.',
    accreditation: 'Fully accredited by GTEC. The university is committed to academic excellence and character development.',
    admissions: 'WASSCE applicants need credits in Core English, Core Mathematics, and relevant elective subjects. Applications are made through the ANU admissions portal.',
    facilities: 'The university has a campus in Koforidua with lecture halls, a library, computer labs, and residential facilities.',
    student_life: 'Students participate in academic conferences, cultural events, community service, and SRC activities.',
    source_url: 'https://www.anu.edu.gh',
  },
  14: {
    name: 'BlueCrest University College',
    description: 'BlueCrest University College was established in 1999 as a private institution offering programmes in information technology, business, and media studies. The university focuses on technology-driven education.',
    accreditation: 'Fully accredited by GTEC. Programmes are designed to meet global industry standards.',
    admissions: 'WASSCE applicants need credits in Core English, Core Mathematics, and relevant elective subjects. Applications are made through the BlueCrest admissions portal.',
    facilities: 'The university has modern IT labs, lecture halls, a library, and media production facilities.',
    student_life: 'Students participate in tech projects, hackathons, industry placements, and SRC activities.',
    source_url: 'https://www.bluecrest.edu.gh',
  },
  15: {
    name: 'Sunyani Technical University',
    description: 'Sunyani Technical University was established in 1967 as a polytechnic and converted to a technical university in 2016. The university offers programmes in engineering, applied sciences, business, and humanities.',
    accreditation: 'Fully accredited by GTEC as a Technical University.',
    admissions: 'WASSCE applicants need credits in Core English, Core Mathematics, and relevant elective subjects. Applications are made through the STU admissions portal.',
    facilities: 'The university has workshops, laboratories, lecture halls, a library, and residential facilities in Sunyani.',
    student_life: 'Students participate in technical projects, industrial attachments, and community service.',
    source_url: 'https://www.stu.edu.gh',
  },
  16: {
    name: 'Ghana Technology University College (GTUC)',
    description: 'GTUC was established in 2000 as a private university college focused on technology education. The university offers programmes in computer science, information technology, engineering, and business technology.',
    accreditation: 'Fully accredited by GTEC. The university has partnerships with international technology companies.',
    admissions: 'WASSCE applicants need credits in Core English, Core Mathematics, and relevant elective subjects. Applications are made through the GTUC admissions portal.',
    facilities: 'GTUC has modern IT labs, engineering workshops, a library, and campuses across Ghana.',
    student_life: 'Students participate in tech competitions, hackathons, industry placements, and innovation challenges.',
    source_url: 'https://www.gtuc.edu.gh',
  },
  17: {
    name: 'University of Cape Town',
    description: 'The University of Cape Town (UCT) was founded in 1829 and is the oldest university in South Africa. It is a public research university located in Cape Town, Western Cape, South Africa. UCT is ranked as the top university in Africa and is a member of the International Alliance of Research Universities.',
    accreditation: 'Accredited by the Council on Higher Education (CHE) and registered with the Department of Higher Education and Training (DHET) of South Africa.',
    admissions: 'Admissions are based on the National Senior Certificate (NSC) or equivalent. International students must have qualifications evaluated by the South African Qualifications Authority (SAQA). English language proficiency is required.',
    facilities: 'UCT has a stunning campus on the slopes of Devil\'s Peak with world-class libraries, laboratories, research centres, student residences, and sports facilities. The campus overlooks the city and Table Bay.',
    student_life: 'UCT has a diverse international student community with over 200 student societies, sports clubs, and cultural organisations. The university is located in one of Africa\'s most vibrant cities.',
    source_url: 'https://www.uct.ac.za',
  },
  18: {
    name: 'University of the Witwatersrand',
    description: 'The University of the Witwatersrand (Wits) was established in 1896 as the South African School of Mines and became a full university in 1922. Located in Johannesburg, South Africa, Wits is one of Africa\'s leading research universities, known for its contributions to mining engineering, paleoanthropology, and social sciences.',
    accreditation: 'Accredited by the Council on Higher Education (CHE) and the Department of Higher Education and Training (DHET). Member of the International Association of Universities.',
    admissions: 'Admissions are based on the National Senior Certificate (NSC) with Bachelor\'s degree endorsement. International students must have qualifications evaluated by SAQA. Specific programme requirements apply.',
    facilities: 'Wits has two campuses — East Campus (Braamfontein) and West Campus — with modern libraries, laboratories, the Wits Art Museum, the Origins Centre, and sports facilities.',
    student_life: 'Wits has a vibrant campus life in the heart of Johannesburg with over 200 student societies and a diverse international student community.',
    source_url: 'https://www.wits.ac.za',
  },
  19: {
    name: 'Stellenbosch University',
    description: 'Stellenbosch University (SU) was established in 1874 and is the second-oldest university in South Africa. Located in the town of Stellenbosch in the Western Cape, SU is a research-intensive university known for its Afrikaans and English medium instruction, beautiful campus, and strong programmes in engineering, science, and agriculture.',
    accreditation: 'Accredited by the Council on Higher Education (CHE) and the Department of Higher Education and Training (DHET). Member of various international university networks.',
    admissions: 'Admissions are based on the National Senior Certificate (NSC). International students need SAQA evaluation and English language proficiency. Afrikaans medium programmes are available for some courses.',
    facilities: 'SU has a beautiful campus in the Cape Winelands with historic and modern buildings, advanced laboratories, the Stellenbosch University Library, and sports facilities.',
    student_life: 'SU offers a rich campus experience with cultural festivals, sports competitions, and a strong residential life system. The town of Stellenbosch is known for its wine culture and scenic beauty.',
    source_url: 'https://www.sun.ac.za',
  },
  20: {
    name: 'University of Nairobi',
    description: 'The University of Nairobi (UoN) is Kenya\'s largest and oldest university, established in 1970 as the University of East Africa before becoming an independent institution. Located in Nairobi, Kenya, UoN is a leading research university in East Africa with a strong focus on science, technology, and development.',
    accreditation: 'Accredited by the Commission for University Education (CUE) of Kenya. Member of the Association of African Universities.',
    admissions: 'Admissions are based on the Kenya Certificate of Secondary Education (KCSE) or equivalent. International students must have qualifications recognised by CUE. English language proficiency is required.',
    facilities: 'UoN has multiple campuses across Nairobi with libraries, laboratories, research centres, and student housing. The main campus is in the city centre.',
    student_life: 'UoN has a diverse student community with various academic, cultural, and sporting organisations. The university is located in one of Africa\'s most dynamic cities.',
    source_url: 'https://www.uonbi.ac.ke',
  },
  21: {
    name: 'Makerere University',
    description: 'Makerere University was established in 1922 as a technical school and became a university college in 1949. It gained full university status in 1970. Located in Kampala, Uganda, Makerere is the oldest and largest university in Uganda and one of the most prestigious in East Africa. The university played a key role in Uganda\'s independence and has produced numerous African leaders.',
    accreditation: 'Accredited by the National Council for Higher Education (NCHE) of Uganda. Member of the Association of African Universities and the International Association of Universities.',
    admissions: 'Admissions are based on the Uganda Advanced Certificate of Education (UACE) or equivalent. International students must have qualifications recognised by NCUE. English language is the medium of instruction.',
    facilities: 'Makerere has a hilltop campus in Kampala with historic buildings, modern laboratories, libraries, the Makerere University Hospital, and sports facilities.',
    student_life: 'Makerere has a vibrant student life with the Guild Union, cultural events, academic conferences, and sports. The university has produced notable alumni including Nobel laureates and heads of state.',
    source_url: 'https://www.mak.ac.ug',
  },
  22: {
    name: 'University of Ibadan',
    description: 'The University of Ibadan (UI) was established in 1948 as the University College Ibadan and became an independent university in 1962. Located in Ibadan, Oyo State, Nigeria, UI is the oldest university in Nigeria and one of the most prestigious. The university has produced numerous Nigerian leaders, academics, and professionals.',
    accreditation: 'Accredited by the National Universities Commission (NUC) of Nigeria. Programmes are also accredited by relevant professional bodies.',
    admissions: 'Admissions are through the Joint Admissions and Matriculation Board (JAMB) for UTME candidates. Direct entry candidates must meet specific requirements. International students apply directly.',
    facilities: 'UI has a large campus in Ibadan with libraries, laboratories, the University College Hospital, residential halls, and sports facilities.',
    student_life: 'UI has a rich tradition of student life with various halls of residence, cultural groups, academic societies, and sports. The university is known as "The Premier University."',
    source_url: 'https://www.ui.edu.ng',
  },
  23: {
    name: 'University of Lagos',
    description: 'The University of Lagos (UNILAG) was established in 1962 and is one of Nigeria\'s premier universities. Located in Akoka, Lagos, UNILAG is known for its academic excellence, research output, and contribution to Nigerian society. The university offers programmes across multiple faculties.',
    accreditation: 'Accredited by the National Universities Commission (NUC) of Nigeria. Programmes are approved by relevant professional bodies.',
    admissions: 'Admissions are through JAMB for UTME candidates. Direct entry candidates must meet specific requirements. International students apply directly with equivalent qualifications.',
    facilities: 'UNILAG has a main campus in Akoka and a satellite campus at the Yaba College of Technology. Facilities include modern libraries, laboratories, a medical centre, and sports facilities.',
    student_life: 'UNILAG has a dynamic student life with the Students\' Union, cultural events, academic conferences, and sports. The university is located in Nigeria\'s commercial capital.',
    source_url: 'https://www.unilag.edu.ng',
  },
  24: {
    name: 'Covenant University',
    description: 'Covenant University was established in 2002 as a private Christian university in Ota, Ogun State, Nigeria. Founded by the Living Faith Church Worldwide, Covenant University is one of the top-ranked private universities in Nigeria, known for its academic excellence, entrepreneurship focus, and moral values.',
    accreditation: 'Accredited by the National Universities Commission (NUC) of Nigeria. Ranked among the top universities in Nigeria by NUC and other ranking agencies.',
    admissions: 'Admissions are through JAMB for UTME candidates. Direct entry candidates must meet specific requirements. The university also considers moral character in admissions.',
    facilities: 'Covenant University has a modern campus in Ota with well-equipped laboratories, a library, ICT centres, a medical centre, and residential facilities.',
    student_life: 'Covenant University emphasises moral discipline alongside academic excellence. Students participate in chapel services, community service, entrepreneurship development, and cultural events.',
    source_url: 'https://www.covenantuniversity.edu.ng',
  },
  25: {
    name: 'Addis Ababa University',
    description: 'Addis Ababa University (AAU) was established in 1950 as a two-year institution and became a full university in 1961. Located in Addis Ababa, Ethiopia, AAU is the oldest and most prestigious university in Ethiopia. It is a major research university with strong programmes in social sciences, natural sciences, and engineering.',
    accreditation: 'Recognised by the Ethiopian Ministry of Education and the Ethiopian Higher Education Relevance and Quality Agency (HERQA).',
    admissions: 'Admissions are based on the Ethiopian Higher Education Entrance Examination (EHEEE). International students must have qualifications evaluated by the Ethiopian Federal Qualifications Verification and Equivalency Directorate.',
    facilities: 'AAU has multiple campuses across Addis Ababa, including the main Campus (Sidist Kilo), the College of Health Sciences campus, and the Sidama campus. Facilities include libraries, laboratories, and research centres.',
    student_life: 'AAU has a vibrant student community with various academic, cultural, and political organisations. The university is located in Ethiopia\'s capital, a city of historical and cultural significance.',
    source_url: 'https://www.aau.edu.et',
  },
  26: {
    name: 'University of Dar es Salaam',
    description: 'The University of Dar es Salaam (UDSM) was established in 1961 as an affiliate of the University of London and became an independent university in 1970. Located in Dar es Salaam, Tanzania, UDSM is the oldest and largest university in Tanzania, offering programmes in arts, sciences, engineering, law, and medicine.',
    accreditation: 'Accredited by the Tanzania Commission for Universities (TCU). Member of the Association of African Universities.',
    admissions: 'Admissions are based on the Advanced Certificate of Secondary Education Examination (ACSEE) or equivalent. International students must have qualifications recognised by TCU.',
    facilities: 'UDSM has a main campus at the Ridge and a medical school campus at Muhimbili. Facilities include libraries, laboratories, a university hospital, and sports facilities.',
    student_life: 'UDSM has a dynamic student life with the Students\' Organisation of Dar es Salaam University (SODAU), cultural events, academic conferences, and sports.',
    source_url: 'https://www.udsm.ac.tz',
  },
  27: {
    name: 'University of Oxford',
    description: 'The University of Oxford is the oldest university in the English-speaking world, with evidence of teaching as early as 1096. Located in Oxford, England, Oxford is consistently ranked among the top universities globally. The university operates a collegiate system with 39 colleges and 6 permanent private halls.',
    accreditation: 'Recognised by the Office for Students (OfS) in England. Listed in the Higher Education Statistics Agency (HESA) institution table. Degrees are internationally recognised.',
    admissions: 'Admissions are through UCAS for undergraduate programmes. International students need IELTS (minimum 7.0 overall) or equivalent English language qualification. Oxford has its own admissions process including tests and interviews for many courses.',
    facilities: 'Oxford has world-class libraries including the Bodleian Library, cutting-edge laboratories, museums including the Ashmolean Museum, and college facilities including dining halls, chapels, and accommodation.',
    student_life: 'Oxford has over 400 student societies, sports clubs, and cultural organisations. The university has a rich tradition of academic debate, rowing, and the famous Oxford-Cambridge Boat Race.',
    source_url: 'https://www.ox.ac.uk',
  },
  28: {
    name: 'University of Cambridge',
    description: 'The University of Cambridge was founded in 1209 and is one of the world\'s leading universities. Located in Cambridge, England, the university operates a collegiate system with 31 colleges. Cambridge has produced numerous Nobel laureates, including Isaac Newton, Charles Darwin, and Stephen Hawking.',
    accreditation: 'Recognised by the Office for Students (OfS) in England. Listed in the HESA institution table. Degrees are internationally recognised.',
    admissions: 'Admissions are through UCAS and the Cambridge Admissions Testing system. International students need IELTS (minimum 7.0 overall) or equivalent. Many courses require admissions tests and interviews.',
    facilities: 'Cambridge has world-class libraries, the Cambridge University Library, museums, laboratories including the Cavendish Laboratory, and college facilities.',
    student_life: 'Cambridge offers over 500 student societies, sports clubs, and the famous May Week celebrations. The university has a rich tradition of academic excellence and innovation.',
    source_url: 'https://www.cam.ac.uk',
  },
  29: {
    name: 'University of Edinburgh',
    description: 'The University of Edinburgh was founded in 1583 and is one of Scotland\'s ancient universities. Located in Edinburgh, Scotland, the university is consistently ranked among the top 20 universities globally. Edinburgh is known for its research output, particularly in medicine, informatics, and the humanities.',
    accreditation: 'Recognised by the Quality Assurance Agency for Higher Education (QAA) in Scotland. Member of the Russell Group and Universitas 21.',
    admissions: 'Admissions are through UCAS. International students need IELTS (minimum 6.5 overall) or equivalent. Edinburgh has its own entry requirements for specific programmes.',
    facilities: 'Edinburgh has a mix of historic and modern campuses including the Central Area, King\'s Buildings, and Easter Bush. Facilities include world-class libraries, laboratories, and the Edinburgh College of Art.',
    student_life: 'Edinburgh has over 300 student societies, sports clubs, and the famous Edinburgh Festival Fringe. The city is known for its cultural scene and historic architecture.',
    source_url: 'https://www.ed.ac.uk',
  },
  30: {
    name: 'University of Manchester',
    description: 'The University of Manchester was formed in 2004 by the merger of the Victoria University of Manchester and the University of Manchester Institute of Science and Technology (UMIST). Located in Manchester, England, the university is a member of the Russell Group and is known for its research in science, engineering, and social sciences.',
    accreditation: 'Recognised by the Office for Students (OfS) in England. Member of the Russell Group of research-intensive universities.',
    admissions: 'Admissions are through UCAS. International students need IELTS (minimum 6.5 overall) or equivalent. The university has specific entry requirements for each programme.',
    facilities: 'Manchester has a single-site campus in the centre of the city with modern libraries, laboratories, the Manchester Museum, and the Whitworth Art Gallery.',
    student_life: 'Manchester has over 400 student societies, sports clubs, and a vibrant cultural scene. The city is known for its music, sport, and nightlife.',
    source_url: 'https://www.manchester.ac.uk',
  },
  31: {
    name: 'Technical University of Munich',
    description: 'The Technical University of Munich (TUM) was founded in 1868 and is one of Germany\'s leading technical universities. Located in Munich, Bavaria, TUM is known for its programmes in engineering, natural sciences, medicine, and management. TUM has been ranked as the number one university in Germany by major ranking agencies.',
    accreditation: 'Accredited by the German Accreditation Council and the Bavarian Ministry of Science. Programs follow the Bologna Process for European higher education.',
    admissions: 'Admissions requirements vary by programme. International students may need to complete a Studienkolleg (foundation year) and pass the Feststellungsprüfung. German language proficiency is required for German-medium programmes. English-medium programmes require IELTS or TOEFL.',
    facilities: 'TUM has campuses in Munich (Garching and city centre), Freising, Heilbronn, Straubing, and Singapore. Facilities include advanced laboratories, the TUM Library, and research institutes.',
    student_life: 'TUM has a vibrant international student community with numerous student organisations, sports facilities (TUM Sport), and cultural events. Munich offers excellent public transport and a high quality of life.',
    source_url: 'https://www.tum.de',
  },
  32: {
    name: 'University of Amsterdam',
    description: 'The University of Amsterdam (UvA) was founded in 1632 and is one of Europe\'s leading research universities. Located in Amsterdam, Netherlands, UvA offers a wide range of English-medium programmes and has a strong international focus with students from over 100 countries.',
    accreditation: 'Accredited by the Accreditation Organisation of the Netherlands and Flanders (NVAO). Member of the League of European Research Universities (LERU).',
    admissions: 'Admissions requirements vary by programme. International students must meet specific entry requirements and may need to provide English language proficiency (IELTS/TOEFL). Some programmes have numerus fixus (limited places).',
    facilities: 'UvA has a city-centre campus with modern library facilities, research centres, and the Academic Medical Centre (AMC). The campus is integrated into the city.',
    student_life: 'UvA has a highly international student community with over 200 student organisations, study associations, and sports facilities. Amsterdam is known for its canals, culture, and cycling.',
    source_url: 'https://www.uva.nl',
  },
  33: {
    name: 'Sorbonne University',
    description: 'Sorbonne University was formed in 2018 by the merger of Paris-Sorbonne University and Pierre and Marie Curie University. Located in Paris, France, the university traces its origins to the College of Sorbonne founded in 1257. Sorbonne is one of the most prestigious universities in France and the world, known for its programmes in humanities, sciences, and medicine.',
    accreditation: 'Recognised by the French Ministry of Higher Education. Programmes follow the European LMD (Licence-Master-Doctorat) framework.',
    admissions: 'Admissions are based on baccalaureate results or equivalent. International students apply through Campus France or directly to the institution. French language proficiency is required for French-medium programmes.',
    facilities: 'Sorbonne has campuses in the Latin Quarter of Paris and other locations. Facilities include historic libraries, laboratories, and the Jussieu Campus.',
    student_life: 'Sorbonne offers a rich student life in the heart of Paris with cultural events, academic conferences, and access to one of the world\'s great cities.',
    source_url: 'https://www.sorbonne-universite.fr',
  },
  34: {
    name: 'University of Education, Winneba',
    description: 'The University of Education, Winneba was established in 1992 to promote teacher education and professional development. UEW operates across multiple campuses including Winneba (North, South, and Central), Ajumako, and Kumasi. The university is committed to producing professionally trained teachers and educational leaders for Ghana and the sub-region. UEW offers programmes in education, arts, sciences, and applied sciences.',
    accreditation: 'Fully accredited by GTEC. Programmes are approved by the National Council for Curriculum and Assessment (NaCCA) and relevant professional bodies. UEW has received multiple awards for its contribution to education in Ghana.',
    admissions: 'Applicants need WASSCE credits in Core English, Core Mathematics, and relevant elective subjects. UEW publishes admission requirements for each programme. Applications are made through the UEW admissions portal. The university offers Undergraduate, Postgraduate, Sandwich, and Distance Education programmes.',
    facilities: 'UEW has multiple campuses with lecture halls, libraries, laboratories, ICT centres, sports facilities, and student housing. The main campus is in Winneba, Central Region. The university has a hospital, a printing press, and various research centres.',
    student_life: 'UEW students participate in SRC activities, hall festivals, cultural events, sports, and academic conferences. The university has a vibrant community with students from across Ghana. The Winneba campus is known for its calm and conducive learning environment.',
    source_url: 'https://www.uew.edu.gh',
  },
};

function getCountryInfo(country) {
  const countryData = {
    Ghana: {
      overview: 'This institution is part of Ghana\'s tertiary education system, regulated by the Ghana Tertiary Education Commission (GTEC). Ghana has over 200 accredited tertiary institutions offering diverse programmes.',
      accreditation: 'Fully accredited by GTEC. All programmes are approved and recognised for professional practice in Ghana.',
      admissions: 'Admissions are based on WASSCE/SSSCE results or equivalent qualifications. Applicants apply through the university\'s admissions office.',
      facilities: 'Campus facilities include modern lecture halls, libraries, laboratories, ICT centres, sports facilities and student accommodation.',
      student_life: 'Ghanaian universities offer a rich campus experience with student unions, cultural festivals, religious societies, sports competitions and community engagement programmes.',
    },
    'South Africa': {
      overview: 'This South African institution is part of Africa\'s most developed higher education system, regulated by the Council on Higher Education (CHE) and the Department of Higher Education and Training.',
      accreditation: 'Accredited by the Council on Higher Education (CHE) and registered with the Department of Higher Education and Training.',
      admissions: 'Admissions are based on the National Senior Certificate (NSC) or equivalent. International students must have qualifications evaluated by SAQA.',
      facilities: 'World-class facilities including advanced research laboratories, digital libraries, innovation hubs and modern student residences.',
      student_life: 'Diverse and vibrant campus life with students from across Africa and the world. Multiple cultural organisations, sports clubs and academic societies.',
    },
    Nigeria: {
      overview: 'This Nigerian university is part of Nigeria\'s tertiary education system, regulated by the National Universities Commission (NUC). Nigeria has over 170 universities.',
      accreditation: 'Accredited by the National Universities Commission (NUC). Professional programmes are also accredited by relevant regulatory bodies.',
      admissions: 'Admissions are through JAMB (Joint Admissions and Matriculation Board) for UTME candidates or direct entry for holders of higher qualifications.',
      facilities: 'Modern campus infrastructure with lecture halls, libraries, laboratories, ICT facilities and residential accommodation.',
      student_life: 'Active student unions, departmental associations, religious groups, cultural organisations and sporting activities.',
    },
    Kenya: {
      overview: 'This Kenyan university is part of East Africa\'s leading higher education system, regulated by the Commission for University Education (CUE).',
      accreditation: 'Accredited by the Commission for University Education (CUE). Programmes meet national and international standards.',
      admissions: 'Admissions are based on KCSE results or equivalent qualifications. The university also admits students through mature entry and credit transfer schemes.',
      facilities: 'Modern campus infrastructure with lecture halls, libraries, laboratories, ICT facilities and student accommodation.',
      student_life: 'A multicultural campus environment with various student organisations, sports facilities and community outreach programmes.',
    },
    Uganda: {
      overview: 'This Ugandan university is part of East Africa\'s growing higher education system, regulated by the National Council for Higher Education (NCHE).',
      accreditation: 'Accredited by the National Council for Higher Education (NCHE). Programmes are regularly reviewed for quality and relevance.',
      admissions: 'Admissions are based on UACE results or equivalent qualifications. The university also offers mature entry and diploma-to-degree pathways.',
      facilities: 'Comprehensive campus facilities including libraries, laboratories, ICT centres, sports facilities and residential halls.',
      student_life: 'Rich campus life with student guild activities, religious organisations, cultural events and sports competitions.',
    },
    Ethiopia: {
      overview: 'This Ethiopian institution is part of Ethiopia\'s rapidly expanding higher education system, regulated by the Ministry of Education.',
      accreditation: 'Recognised by the Ethiopian Ministry of Education and the Ethiopian Higher Education Relevance and Quality Agency (HERQA).',
      admissions: 'Admissions are based on the Ethiopian Higher Education Entrance Examination (EHEEE) results or equivalent qualifications.',
      facilities: 'The campus features lecture halls, libraries, laboratories, ICT centres and student housing.',
      student_life: 'Active student communities with various clubs, societies and cultural activities.',
    },
    Tanzania: {
      overview: 'This Tanzanian university is part of Tanzania\'s higher education system, regulated by the Tanzania Commission for Universities (TCU).',
      accreditation: 'Accredited by the Tanzania Commission for Universities (TCU). All programmes meet national quality standards.',
      admissions: 'Admissions are based on ACSEE results or equivalent qualifications. Direct entry applicants must meet specific programme requirements.',
      facilities: 'Modern campus with lecture theatres, libraries, laboratories, ICT facilities and student accommodation.',
      student_life: 'Vibrant student life with various organisations, cultural activities, sports and community engagement.',
    },
    'United Kingdom': {
      overview: 'This UK university is part of one of the world\'s most prestigious higher education systems, regulated by the Office for Students (OfS).',
      accreditation: 'Recognised by the Office for Students (OfS) and listed in the HESA institution table. Degrees are internationally recognised.',
      admissions: 'Admissions are through UCAS for undergraduate programmes. International students need IELTS/TOEFL English language qualifications.',
      facilities: 'State-of-the-art facilities including world-class libraries, research centres, laboratories and student support services.',
      student_life: 'Diverse international student community with hundreds of student societies, sports clubs and cultural organisations.',
    },
    Germany: {
      overview: 'This German university is part of Germany\'s tuition-free public higher education system, known for its engineering and technology programmes.',
      accreditation: 'Recognised by the German Accreditation Council. Programmes meet German and EU quality standards.',
      admissions: 'Admissions requirements vary by programme. International students may need to complete a Studienkolleg and pass the Feststellungsprüfung.',
      facilities: 'Excellent facilities with advanced laboratories, libraries, computing centres and research institutes.',
      student_life: 'International student community with affordable living, excellent public transport and vibrant cultural scene.',
    },
    Netherlands: {
      overview: 'This Dutch university is part of the Netherlands\' highly international higher education system.',
      accreditation: 'Accredited by the Accreditation Organisation of the Netherlands and Flanders (NVAO).',
      admissions: 'Admissions are based on prior academic qualifications. International students may need to meet specific entry requirements and English language proficiency.',
      facilities: 'Modern campus facilities with digital libraries, research labs, study spaces and career services.',
      student_life: 'Highly international environment with students from over 100 countries. Active student associations and cultural organisations.',
    },
    France: {
      overview: 'This French university is part of France\'s prestigious higher education system, following the European LMD framework.',
      accreditation: 'Recognised by the French Ministry of Higher Education. Programmes follow the European LMD framework.',
      admissions: 'Admissions are based on baccalaureate results or equivalent. International students apply through Campus France or directly.',
      facilities: 'Historic and modern campus facilities including libraries, laboratories, research centres and cultural venues.',
      student_life: 'Dynamic student life with the French university system, student associations and cultural activities.',
    },
  };
  return countryData[country] || countryData['Ghana'];
}

export default function UniversityProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [university, setUniversity] = useState(null);
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [facultyFilter, setFacultyFilter] = useState('');
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    fetchUniversity();
    fetchProgrammes();
  }, [id]);

  const fetchUniversity = async () => {
    try {
      const res = await api.get(`/api/v1/universities/${id}`);
      setUniversity(res.data);
    } catch (err) {
      console.error('Failed to load university', err);
    }
  };

  const fetchProgrammes = async () => {
    setLoading(true);
    try {
      let url = `/api/v1/universities/${id}/programmes`;
      if (facultyFilter) url += `?faculty=${encodeURIComponent(facultyFilter)}`;
      const res = await api.get(url);
      setProgrammes(res.data.programmes || []);
      const uniqueFaculties = [...new Set((res.data.programmes || []).map(p => p.faculty).filter(Boolean))];
      setFaculties(uniqueFaculties);
    } catch (err) {
      console.error('Failed to load programmes', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgrammes();
  }, [facultyFilter]);

  const handleSave = async () => {
    if (!user) { toast.error('Please login to save'); return; }
    try {
      await api.post('/api/v1/saved/universities', { university_id: parseInt(id) });
      toast.success('University saved!');
    } catch (err) {
      toast.error('Failed to save');
    }
  };

  if (!university) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading university...</div>
      </div>
    );
  }

  const uniId = parseInt(id);
  const verifiedInfo = UNIVERSITY_INFO[uniId];
  const countryInfo = getCountryInfo(university.country || 'Ghana');

  const description = verifiedInfo?.description || university.description || countryInfo.overview;
  const accreditation = verifiedInfo?.accreditation || university.accreditation || countryInfo.accreditation;
  const admissions = verifiedInfo?.admissions || countryInfo.admissions;
  const facilitiesInfo = verifiedInfo?.facilities || countryInfo.facilities;
  const studentLifeInfo = verifiedInfo?.student_life || countryInfo.student_life;
  const sourceUrl = verifiedInfo?.source_url || university.official_website;

  const groupedProgrammes = {};
  programmes.forEach(p => {
    const key = p.faculty || 'Other';
    if (!groupedProgrammes[key]) groupedProgrammes[key] = [];
    groupedProgrammes[key].push(p);
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{university.name}</h1>
                {university.short_name && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">{university.short_name}</span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  university.institution_type === 'public' ? 'bg-blue-100 text-blue-800' :
                  university.institution_type === 'private' ? 'bg-purple-100 text-purple-800' :
                  'bg-amber-100 text-amber-800'
                }`}>{university.institution_type}</span>
                {university.region && (
                  <span className="flex items-center gap-1"><FiMapPin /> {university.region}{university.city ? `, ${university.city}` : ''}</span>
                )}
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              {user && (
                <button onClick={handleSave} className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center gap-2 transition">
                  <FiSave /> Save
                </button>
              )}
              <button
                onClick={() => {
                  if (!user) {
                    toast.error('Please login to check eligibility');
                    navigate('/eligibility', { state: { from: `/explore/universities/${id}` } });
                  } else { navigate('/eligibility'); }
                }}
                className="px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 flex items-center gap-2 transition"
              >
                <FiCheckCircle /> Check Eligibility
              </button>
              {university.official_website && (
                <a href={university.official_website} target="_blank" rel="noopener noreferrer"
                   className="px-4 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-900 flex items-center gap-2 transition">
                  <FiGlobe /> Visit Website <FiExternalLink />
                </a>
              )}
            </div>
          </div>
          {university.verification_status && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <span className={`inline-flex items-center gap-2 text-sm ${university.verification_status === 'verified' ? 'text-green-600' : 'text-amber-600'}`}>
                <span className={`w-2 h-2 rounded-full ${university.verification_status === 'verified' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                Verified Official Source
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-1 mb-6 bg-white rounded-xl border border-slate-200 p-1 overflow-x-auto">
          {['overview', 'programmes', 'requirements', 'guide'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition whitespace-nowrap flex items-center gap-2 ${activeTab === tab ? 'bg-primary-500 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
              {tab === 'guide' && <FiFileText className="w-4 h-4" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">About {university.name}</h2>
              <p className="text-slate-600 leading-relaxed mb-4">{description}</p>
              {accreditation && (
                <div className="p-3 bg-green-50 rounded-lg mb-4">
                  <p className="text-sm text-green-800"><strong>Accreditation:</strong> {accreditation}</p>
                </div>
              )}
              {sourceUrl && (
                <p className="text-xs text-slate-400 mt-4">Source: <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-600">{sourceUrl}</a></p>
              )}
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Contact</h2>
              <div className="space-y-3 text-sm">
                {university.official_website && (
                  <div className="flex items-center gap-2"><FiGlobe className="text-slate-400" />
                    <a href={university.official_website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline truncate">{university.official_website}</a>
                  </div>
                )}
                {university.admissions_website && (
                  <div className="flex items-center gap-2"><FiBookOpen className="text-slate-400" />
                    <a href={university.admissions_website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline truncate">Admissions Portal</a>
                  </div>
                )}
                {university.contact_email && (
                  <div className="flex items-center gap-2"><FiMail className="text-slate-400" /><span className="text-slate-600">{university.contact_email}</span></div>
                )}
              </div>
              {university.campuses && university.campuses.length > 0 && (
                <div className="mt-6"><h3 className="font-medium text-slate-900 mb-2">Campuses</h3>
                  {university.campuses.map((c) => (<div key={c.id} className="text-sm text-slate-600 py-1">{c.campus_name}{c.location ? ` - ${c.location}` : ''}</div>))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'programmes' && (
          <div>
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              <button onClick={() => setFacultyFilter('')}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${!facultyFilter ? 'bg-primary-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                All Faculties ({programmes.length})
              </button>
              {faculties.map(f => (
                <button key={f} onClick={() => setFacultyFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${facultyFilter === f ? 'bg-primary-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{f}</button>
              ))}
            </div>
            {loading ? (
              <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-20 bg-white rounded-xl animate-pulse"></div>)}</div>
            ) : programmes.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200"><FiBookOpen className="mx-auto text-3xl text-slate-300 mb-3" /><p className="text-slate-500">No programmes found</p></div>
            ) : (
              Object.entries(groupedProgrammes).map(([faculty, progs]) => (
                <div key={faculty} className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">{faculty}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {progs.map(p => (
                      <div key={p.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-primary-200 transition group">
                        <div className="flex justify-between items-start">
                          <Link to={`/explore/programmes/${p.id}`} className="flex-1">
                            <h4 className="font-medium text-slate-900 group-hover:text-primary-600 transition">{p.name}</h4>
                            <p className="text-sm text-slate-500 mt-1">{p.degree_type} &middot; {p.duration_years} years</p>
                          </Link>
                          <button onClick={() => {
                            if (!user) { toast.error('Please login to check eligibility'); navigate('/eligibility', { state: { from: `/explore/universities/${id}` } }); } else { navigate('/eligibility'); }
                          }} className="px-3 py-1 text-xs bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition flex items-center gap-1 whitespace-nowrap">
                            <FiCheckCircle className="w-3 h-3" /> Check
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Admission Requirements</h2>
            <div className="prose prose-slate max-w-none text-slate-600">
              <p className="mb-4 whitespace-pre-line">{admissions}</p>
              <h3 className="text-base font-semibold text-slate-800">General WASSCE Requirements</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Core English Language</li>
                <li>Core Mathematics</li>
                <li>Integrated Science or Social Studies (depending on programme)</li>
                <li>Relevant elective subjects (varies by programme)</li>
              </ul>
              <p className="mt-4 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg">
                Note: Admission requirements are subject to change. Always verify with the official university admissions website.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center"><FiFileText /></div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">About {university.name}</h2>
                <p className="text-sm text-slate-500">Verified information from official sources</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-2">Overview</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
              </div>
              <div className="p-5 bg-green-50 rounded-xl border border-green-100">
                <h3 className="font-semibold text-green-800 mb-2">Accreditation & Recognition</h3>
                <p className="text-green-700 leading-relaxed text-sm">{accreditation}</p>
              </div>
              <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">Admissions</h3>
                <p className="text-blue-700 leading-relaxed text-sm whitespace-pre-line">{admissions}</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-xl border border-purple-100">
                <h3 className="font-semibold text-purple-800 mb-2">Facilities</h3>
                <p className="text-purple-700 leading-relaxed text-sm">{facilitiesInfo}</p>
              </div>
              <div className="p-5 bg-amber-50 rounded-xl border border-amber-100">
                <h3 className="font-semibold text-amber-800 mb-2">Student Life</h3>
                <p className="text-amber-700 leading-relaxed text-sm">{studentLifeInfo}</p>
              </div>
            </div>
            {sourceUrl && (
              <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-sm text-slate-600">Source: <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 underline hover:text-primary-700">{sourceUrl}</a></p>
              </div>
            )}
            <div className="mt-4 p-4 bg-primary-50 rounded-xl border border-primary-100">
              <p className="text-sm text-primary-700 leading-relaxed">
                <strong>Disclaimer:</strong> This information is compiled from official university sources and is provided for guidance purposes. Always verify details with the official university website or admissions office for the most current information.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
