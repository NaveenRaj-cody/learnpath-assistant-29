import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Building, Check } from 'lucide-react';
import { coursesData, College } from '@/data/coursesData';
import AnimatedTransition from '@/components/AnimatedTransition';
import CoursesModal from '@/components/CoursesModal';
import { useToast } from "@/hooks/use-toast";
import StarRating from '@/components/StarRating';
import { CollegeType, CollegeAffiliation, CollegeSpecialization } from '@/types/filters';
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const statesData = [
  { name: "Andhra Pradesh", districts: ["Alluri Sitarama Raju", "Anakapalli", "Anantapur", "Annamaya", "Bapatla", "Chittoor", "East Godavari", "Eluru", "Guntur", "Kadapa", "Kakinada", "Konaseema", "Krishna", "Kurnool", "Manyam", "N T Rama Rao", "Nandyal", "Nellore", "Palnadu", "Prakasam", "Sri Balaji", "Sri Satya Sai", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari"] },
  { name: "Arunachal Pradesh", districts: ["Anjaw", "Bichom", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Keyi Panyor", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"] },
  { name: "Assam", districts: ["Bajali", "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup Metropolitan", "Kamrup Rural", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tamulpur", "Tinsukia", "Udalguri", "West Karbi Anglong"] },
  { name: "Bihar", districts: ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"] },
  { name: "Chhattisgarh", districts: ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela Pendra Marwahi", "Janjgir Champa", "Jashpur", "Kabirdham", "Kanker", "Khairagarh", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Manendragarh", "Mohla Manpur", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sakti", "Sarangarh Bilaigarh", "Sukma", "Surajpur", "Surguja"] },
  { name: "Goa", districts: ["North Goa", "South Goa"] },
  { name: "Gujarat", districts: ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"] },
  { name: "Haryana", districts: ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"] },
  { name: "Himachal Pradesh", districts: ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"] },
  { name: "Jharkhand", districts: ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"] },
  { name: "Karnataka", districts: ["Bagalkot", "Bangalore Rural", "Bangalore Urban", "Belgaum", "Bellary", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysore", "Raichur", "Ramanagara", "Shimoga", "Tumkur", "Udupi", "Uttara Kannada", "Vijayanagara", "Vijayapura", "Yadgir"] },
  { name: "Kerala", districts: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"] },
  { name: "Madhya Pradesh", districts: ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhaua", "Katni", "Khandwa", "Khargone", "Maihar", "Mandla", "Mandsaur", "Mauganj", "Morena", "Narsinghpur", "Neemuch", "Niwari", "Pandhurna", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"] },
  { name: "Maharashtra", districts: ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"] },
  { name: "Manipur", districts: ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"] },
  { name: "Meghalaya", districts: ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "Mairang", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"] },
  { name: "Mizoram", districts: ["Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Saitual", "Serchhip"] },
  { name: "Nagaland", districts: ["Chumukedima", "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Niuland", "Noklak", "Peren", "Phek", "Shamator", "Tseminyu", "Tuensang", "Wokha", "Zunheboto"] },
  { name: "Odisha", districts: ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Debagarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundergarh"] },
  { name: "Punjab", districts: ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Malerkotla", "Mansa", "Moga", "Mohali", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sangrur", "Shaheed Bhagat Singh Nagar", "Tarn Taran"] },
  { name: "Rajasthan", districts: ["Ajmer", "Alwar", "Anupgarh", "Balotra", "Banswara", "Baran", "Barmer", "Beawar", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Deeg", "Dholpur", "Didwana Kuchaman", "Dudu", "Dungarpur", "Gangapur City", "Hanumangarh", "Jaipur", "Jaipur Rural", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Jodhpur Rural", "Karauli", "Kekri", "Khairthal Tijara", "Kota", "Kotputli Behror", "Nagaur", "Neem ka Thana", "Pali", "Phalodi", "Pratapgarh", "Rajsamand", "Salumbar", "Sanchore", "Sawai Madhopur", "Shahpura", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"] },
  { name: "Sikkim", districts: ["East Sikkim", "North Sikkim", "Pakyong", "Soreng", "South Sikkim", "West Sikkim"] },
  { name: "Tamil Nadu", districts: ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupattur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"] },
  { name: "Telangana", districts: ["Adilabad", "Bhadradri Kothagudem", "Hanamkonda", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar", "Jogulamba", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad", "Mahbubnagar", "Mancherial", "Medak", "Medchal Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal", "Yadadri Bhuvanagiri"] },
  { name: "Tripura", districts: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"] },
  { name: "Uttar Pradesh", districts: ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"] },
  { name: "Uttarakhand", districts: ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri", "Pithoragarh", "Rudraprayag", "Tehri", "Udham Singh Nagar", "Uttarkashi"] },
  { name: "West Bengal", districts: ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"] },
  { name: "Andaman and Nicobar Islands", districts: ["Nicobar", "North Middle Andaman", "South Andaman"] },
  { name: "Chandigarh", districts: ["Chandigarh"] },
  { name: "Dadra and Nagar Haveli and Daman and Diu", districts: ["Dadra and Nagar Haveli", "Daman", "Diu"] },
  { name: "Delhi", districts: ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"] },
  { name: "Jammu and Kashmir", districts: ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"] },
  { name: "Ladakh", districts: ["Kargil", "Leh"] },
  { name: "Lakshadweep", districts: ["Lakshadweep"] },
  { name: "Puducherry", districts: ["Karaikal", "Mahe", "Puducherry", "Yanam"] }
];

const getCollegeRating = (collegeName: string): number => {
  const nameSum = collegeName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return 3 + (nameSum % 20) / 10;
};

const CollegesPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [collegeTypeFilter, setCollegeTypeFilter] = useState<CollegeType>('all');
  const [collegeAffiliationFilter, setCollegeAffiliationFilter] = useState<CollegeAffiliation>('all');
  const [specializationFilter, setSpecializationFilter] = useState<CollegeSpecialization>('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [showCoursesModal, setShowCoursesModal] = useState(false);
  const [modalType, setModalType] = useState<'courses' | 'colleges'>('colleges');
  const [stateSearchOpen, setStateSearchOpen] = useState(false);
  const [districtSearchOpen, setDistrictSearchOpen] = useState(false);
  const [stateSearchTerm, setStateSearchTerm] = useState('');
  const [districtSearchTerm, setDistrictSearchTerm] = useState('');

  const allColleges = coursesData.flatMap(course => course.topColleges);
  
  const uniqueColleges = allColleges.filter((college, index, self) =>
    index === self.findIndex((c) => c.name === college.name)
  );
  
  const collegeTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'medical', label: 'Medical' },
    { value: 'arts', label: 'Arts and Science' },
    { value: 'commerce', label: 'Commerce and Business' },
    { value: 'law', label: 'Law' },
    { value: 'design', label: 'Design and Creative' },
    { value: 'agricultural', label: 'Agricultural' },
    { value: 'veterinary', label: 'Veterinary' },
    { value: 'hotel', label: 'Hotel Management' }
  ];
  
  const collegeAffiliationOptions = [
    { value: 'all', label: 'All Affiliations' },
    { value: 'central', label: 'Central Government' },
    { value: 'state', label: 'State Government' },
    { value: 'private', label: 'Private' },
    { value: 'deemed', label: 'Deemed-to-be Universities' },
    { value: 'autonomous', label: 'Autonomous Colleges' }
  ];
  
  const specializationOptions = [
    { value: 'all', label: 'All' },
    { value: 'women', label: 'Women\'s College' },
    { value: 'men', label: 'Men\'s College' },
    { value: 'coed', label: 'Co-education' }
  ];
  
  const filteredStates = stateSearchTerm 
    ? statesData.filter(state => 
        state.name.toLowerCase().includes(stateSearchTerm.toLowerCase())
      )
    : statesData;
  
  const availableDistricts = stateFilter === 'all' 
    ? [] 
    : statesData.find(state => state.name === stateFilter)?.districts || [];
  
  const filteredDistricts = districtSearchTerm 
    ? availableDistricts.filter(district => 
        district.toLowerCase().includes(districtSearchTerm.toLowerCase())
      )
    : availableDistricts;
  
  const filteredColleges = uniqueColleges.filter(college => {
    const matchesSearch = searchTerm === '' || 
      college.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = collegeTypeFilter === 'all' || 
      (collegeTypeFilter === 'engineering' && college.name.includes('Engineering')) ||
      (collegeTypeFilter === 'medical' && college.name.includes('Medical')) ||
      (collegeTypeFilter === 'arts' && college.name.includes('Arts')) ||
      (collegeTypeFilter === 'commerce' && college.name.includes('Commerce')) ||
      (collegeTypeFilter === 'law' && college.name.includes('Law')) ||
      (collegeTypeFilter === 'design' && college.name.includes('Design')) ||
      (collegeTypeFilter === 'agricultural' && college.name.includes('Agricultural')) ||
      (collegeTypeFilter === 'veterinary' && college.name.includes('Veterinary')) ||
      (collegeTypeFilter === 'hotel' && college.name.includes('Hotel'));
    
    const matchesAffiliation = collegeAffiliationFilter === 'all' || 
      (collegeAffiliationFilter === 'central' && college.name.includes('Indian Institute')) ||
      (collegeAffiliationFilter === 'state' && college.name.includes('State')) ||
      (collegeAffiliationFilter === 'private' && !college.name.includes('Institute') && !college.name.includes('University')) ||
      (collegeAffiliationFilter === 'deemed' && college.name.includes('University')) ||
      (collegeAffiliationFilter === 'autonomous' && (college.name.includes('College') || college.name.includes('Institute')));
    
    const matchesSpecialization = specializationFilter === 'all' || 
      (specializationFilter === 'women' && college.name.toLowerCase().includes('women')) ||
      (specializationFilter === 'men' && college.name.toLowerCase().includes('men')) ||
      (specializationFilter === 'coed' && !college.name.toLowerCase().includes('women') && !college.name.toLowerCase().includes('men'));
    
    const matchesState = stateFilter === 'all' || 
      college.location.includes(stateFilter);
    
    const matchesDistrict = districtFilter === 'all' || 
      college.location.includes(districtFilter);
    
    return matchesSearch && matchesType && matchesAffiliation && matchesSpecialization && matchesState && matchesDistrict;
  });

  const handleViewDetails = (college: College) => {
    toast({
      title: "Viewing college details",
      description: `Loading details for ${college.name}`,
      duration: 2000,
    });
    navigate(`/colleges/${encodeURIComponent(college.name)}`);
  };

  const handleFilterChange = (type: string, value: string) => {
    toast({
      description: `Filter updated: ${type} set to ${value === 'all' ? 'All' : value}`,
      duration: 1500,
    });
    
    if (type === 'type') {
      setCollegeTypeFilter(value as CollegeType);
    } else if (type === 'affiliation') {
      setCollegeAffiliationFilter(value as CollegeAffiliation);
    } else if (type === 'specialization') {
      setSpecializationFilter(value as CollegeSpecialization);
    } else if (type === 'state') {
      setStateFilter(value);
      setDistrictFilter('all');
      setStateSearchOpen(false);
    } else if (type === 'district') {
      setDistrictFilter(value);
      setDistrictSearchOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <AnimatedTransition>
          <h1 className="text-3xl font-bold mb-8 text-gradient">Colleges</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1">
              <Card className="glass-panel hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">Filters</CardTitle>
                  <CardDescription>Refine your college search</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Search colleges..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 glass-input active:scale-[0.99] focus:scale-[1.01] transition-all hover:border-primary/50"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">College Type</label>
                    <Select
                      value={collegeTypeFilter}
                      onValueChange={(value) => handleFilterChange('type', value)}
                    >
                      <SelectTrigger className="glass-input active:scale-[0.98] hover:shadow-md transition-all">
                        <SelectValue placeholder="Select college type" />
                      </SelectTrigger>
                      <SelectContent>
                        {collegeTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">College Affiliation</label>
                    <Select
                      value={collegeAffiliationFilter}
                      onValueChange={(value) => handleFilterChange('affiliation', value)}
                    >
                      <SelectTrigger className="glass-input active:scale-[0.98] hover:shadow-md transition-all">
                        <SelectValue placeholder="Select college affiliation" />
                      </SelectTrigger>
                      <SelectContent>
                        {collegeAffiliationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Specialization</label>
                    <Select
                      value={specializationFilter}
                      onValueChange={(value) => handleFilterChange('specialization', value)}
                    >
                      <SelectTrigger className="glass-input active:scale-[0.98] hover:shadow-md transition-all">
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        {specializationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">States and Union Territories</label>
                    <Popover open={stateSearchOpen} onOpenChange={setStateSearchOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={stateSearchOpen}
                          className="w-full justify-between glass-input active:scale-[0.98] hover:shadow-md transition-all"
                        >
                          {stateFilter === 'all' ? 'All States & UTs' : stateFilter}
                          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput 
                            placeholder="Search states..." 
                            className="h-9" 
                            value={stateSearchTerm} 
                            onValueChange={setStateSearchTerm}
                          />
                          <CommandEmpty>No state found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-[300px]">
                              <CommandItem
                                value="all"
                                onSelect={() => handleFilterChange('state', 'all')}
                                className="cursor-pointer"
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${stateFilter === 'all' ? 'opacity-100' : 'opacity-0'}`}
                                />
                                All States & UTs
                              </CommandItem>
                              {filteredStates.map((state) => (
                                <CommandItem
                                  key={state.name}
                                  value={state.name}
                                  onSelect={() => handleFilterChange('state', state.name)}
                                  className="cursor-pointer"
                                >
                                  <Check
                                    className={`mr-2 h-4 w-4 ${stateFilter === state.name ? 'opacity-100' : 'opacity-0'}`}
                                  />
                                  {state.name}
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  {stateFilter !== 'all' && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">District</label>
                      <Popover open={districtSearchOpen} onOpenChange={setDistrictSearchOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={districtSearchOpen}
                            className="w-full justify-between glass-input active:scale-[0.98] hover:shadow-md transition-all"
                          >
                            {districtFilter === 'all' ? 'All Districts' : districtFilter}
                            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput 
                              placeholder="Search districts..." 
                              className="h-9" 
                              value={districtSearchTerm} 
                              onValueChange={setDistrictSearchTerm}
                            />
                            <CommandEmpty>No district found.</CommandEmpty>
                            <CommandGroup>
                              <ScrollArea className="h-[200px]">
                                <CommandItem
                                  value="all"
                                  onSelect={() => handleFilterChange('district', 'all')}
                                  className="cursor-pointer"
                                >
                                  <Check
                                    className={`mr-2 h-4 w-4 ${districtFilter === 'all' ? 'opacity-100' : 'opacity-0'}`}
                                  />
                                  All Districts
                                </CommandItem>
                                {filteredDistricts.map((district) => (
                                  <CommandItem
                                    key={district}
                                    value={district}
                                    onSelect={() => handleFilterChange('district', district)}
                                    className="cursor-pointer"
                                  >
                                    <Check
                                      className={`mr-2 h-4 w-4 ${districtFilter === district ? 'opacity-100' : 'opacity-0'}`}
                                    />
                                    {district}
                                  </CommandItem>
                                ))}
                              </ScrollArea>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-primary/10 hover:text-primary hover:shadow-md active:scale-[0.97] transition-all"
                    onClick={() => {
                      setSearchTerm('');
                      setCollegeTypeFilter('all');
                      setCollegeAffiliationFilter('all');
                      setSpecializationFilter('all');
                      setStateFilter('all');
                      setDistrictFilter('all');
                      setStateSearchTerm('');
                      setDistrictSearchTerm('');
                      toast({
                        description: "All filters reset",
                        duration: 1500,
                      });
                    }}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Results ({filteredColleges.length})</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredColleges.length === 0 ? (
                  <div className="col-span-full bg-muted rounded-lg p-8 text-center">
                    <Building className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No colleges found</h3>
                    <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchTerm('');
                        setCollegeTypeFilter('all');
                        setCollegeAffiliationFilter('all');
                        setSpecializationFilter('all');
                        setStateFilter('all');
                        setDistrictFilter('all');
                        setStateSearchTerm('');
                        setDistrictSearchTerm('');
                        toast({
                          description: "All filters reset",
                          duration: 1500,
                        });
                      }}
                      className="hover:bg-primary/10 hover:text-primary hover:shadow-md active:scale-[0.97] transition-all"
                    >
                      Reset Filters
                    </Button>
                  </div>
                ) : (
                  filteredColleges.map((college, index) => (
                    <Card key={index} className="h-full cursor-pointer hover:border-primary transition-colors hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start mb-2">
                          <StarRating rating={getCollegeRating(college.name)} />
                        </div>
                        <CardTitle className="text-lg">{college.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {college.location}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button 
                          size="sm" 
                          className="w-full hover:bg-primary/90 hover:shadow-md active:scale-[0.96] transition-all" 
                          variant="outline"
                          onClick={() => handleViewDetails(college)}
                        >
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </AnimatedTransition>
      </main>
      
      <CoursesModal 
        isOpen={showCoursesModal} 
        onClose={() => setShowCoursesModal(false)} 
        type={modalType} 
      />
    </div>
  );
};

export default CollegesPage;
