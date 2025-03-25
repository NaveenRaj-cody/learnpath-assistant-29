
export type CourseLevel = 
  | 'all' 
  | 'undergraduate' 
  | 'postgraduate' 
  | 'doctoral' 
  | 'diploma' 
  | 'integrated' 
  | 'professional';

export type SubjectArea = 
  | 'all' 
  | 'engineering' 
  | 'medicine' 
  | 'business' 
  | 'law' 
  | 'arts' 
  | 'science' 
  | 'commerce' 
  | 'design' 
  | 'education' 
  | 'vocational' 
  | 'agriculture'
  | 'information-technology'
  | 'hospitality'
  | 'media'
  | 'paramedical'
  | 'social-sciences'
  | 'management'
  | 'architecture'
  | 'computer-applications'
  | 'hotel-management'
  | 'pharmacy'
  | 'accountancy'
  | 'veterinary'
  | 'fashion'
  | 'integrated-law'
  | 'integrated-science'
  | 'integrated-management'
  | 'integrated-technology'
  | 'integrated-education'
  | 'others';

export type CollegeType = 
  | 'all' 
  | 'engineering' 
  | 'medical' 
  | 'dental'
  | 'pharmacy'
  | 'law' 
  | 'architecture'
  | 'management'
  | 'arts' 
  | 'polytechnic'
  | 'education'
  | 'agricultural' 
  | 'veterinary' 
  | 'other';

export type CollegeAffiliation = 
  | 'all' 
  | 'autonomous' 
  | 'affiliated'
  | 'government'
  | 'private' 
  | 'deemed' 
  | 'central'
  | 'state';

export type CollegeSpecialization = 
  | 'all' 
  | 'women' 
  | 'men' 
  | 'coed';

export interface CollegeCredentials {
  ranking?: string;
  accreditation?: string;
  affiliation?: string;
}
