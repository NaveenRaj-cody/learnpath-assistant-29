import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { GraduationCap, User, MapPin, Home } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import { useAuth } from '@/contexts/AuthContext';
import SearchableSelect from '@/components/SearchableSelect';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  { name: "Madhya Pradesh", districts: ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhau", "Katni", "Khandwa", "Khargone", "Maihar", "Mandla", "Mandsaur", "Mauganj", "Morena", "Narsinghpur", "Neemuch", "Niwari", "Pandhurna", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"] },
  { name: "Maharashtra", districts: ["Ahmednagar", "Akola", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"] },
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

const educationLevels = [
  "10th Standard",
  "12th Standard",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Other"
];

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    educationLevel: '',
    currentInstitution: '',
    state: '',
    district: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    educationLevel: '',
    state: '',
  });

  const availableDistricts = useMemo(() => 
    formData.state ? 
      statesData.find(state => state.name === formData.state)?.districts || [] 
      : [], 
    [formData.state]
  );

  const stateOptions = useMemo(() => 
    statesData.map(state => ({ value: state.name, label: state.name })),
    []
  );

  const districtOptions = useMemo(() => 
    availableDistricts.map(district => ({ value: district, label: district })),
    [availableDistricts]
  );

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (formData.district && !availableDistricts.includes(formData.district)) {
      setFormData(prev => ({
        ...prev,
        district: ''
      }));
    }
  }, [formData.state, availableDistricts, formData.district]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step: number) => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
        valid = false;
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
        valid = false;
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        valid = false;
      }
    } 
    else if (step === 2) {
      if (!formData.educationLevel) {
        newErrors.educationLevel = 'Education level is required';
        valid = false;
      }
    }
    else if (step === 3) {
      if (!formData.state) {
        newErrors.state = 'State is required';
        valid = false;
      }
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast.error("Please fix the errors before continuing");
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.educationLevel || !formData.state) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    const loginSuccess = login(formData);
    
    if (loginSuccess) {
      toast.success("Login successful! Welcome to Career Compass");
      navigate('/');
    } else {
      toast.error("Login failed. Please check your information.");
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <AnimatedTransition>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center">
                  Full Name <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`hover:shadow-md focus:shadow-md active:scale-[1.01] transition-all ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                  required
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center">
                  Email Address <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`hover:shadow-md focus:shadow-md active:scale-[1.01] transition-all ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          </AnimatedTransition>
        );
        
      case 2:
        return (
          <AnimatedTransition>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="educationLevel" className="flex items-center">
                  Highest Education Level Completed <span className="text-red-500 ml-1">*</span>
                </Label>
                <Select
                  value={formData.educationLevel}
                  onValueChange={(value) => handleSelectChange('educationLevel', value)}
                >
                  <SelectTrigger 
                    id="educationLevel" 
                    className={`w-full hover:shadow-md active:scale-[1.01] transition-all ${errors.educationLevel ? 'border-red-500 focus:ring-red-500' : ''}`}
                  >
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationLevels.map((level) => (
                      <SelectItem 
                        key={level} 
                        value={level}
                        className="hover:bg-primary/10 cursor-pointer transition-colors"
                      >
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.educationLevel && <p className="text-red-500 text-sm mt-1">{errors.educationLevel}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentInstitution">Current/Last Institution</Label>
                <Input
                  id="currentInstitution"
                  name="currentInstitution"
                  placeholder="Name of your institution"
                  value={formData.currentInstitution}
                  onChange={handleChange}
                  className="hover:shadow-md focus:shadow-md active:scale-[1.01] transition-all"
                />
              </div>
            </div>
          </AnimatedTransition>
        );
        
      case 3:
        return (
          <AnimatedTransition>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="state" className="flex items-center">
                  State <span className="text-red-500 ml-1">*</span>
                </Label>
                <SearchableSelect
                  options={stateOptions}
                  value={formData.state}
                  onValueChange={(value) => handleSelectChange('state', value)}
                  placeholder="Select your state"
                  className={errors.state ? 'border-red-500 focus:ring-red-500' : ''}
                  noResultsText="No states found"
                  searchPlaceholder="Search states..."
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>
              
              {formData.state && (
                <div className="space-y-2">
                  <Label htmlFor="district">District/City</Label>
                  <SearchableSelect
                    options={districtOptions}
                    value={formData.district}
                    onValueChange={(value) => handleSelectChange('district', value)}
                    placeholder="Select your district"
                    noResultsText="No districts found"
                    searchPlaceholder="Search districts..."
                  />
                </div>
              )}
            </div>
          </AnimatedTransition>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto py-8 px-4 max-w-md">
        <AnimatedTransition>
          <Card className="glass-panel hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10">
                  {currentStep === 1 && <User className="h-8 w-8 text-primary" />}
                  {currentStep === 2 && <GraduationCap className="h-8 w-8 text-primary" />}
                  {currentStep === 3 && <MapPin className="h-8 w-8 text-primary" />}
                </div>
              </div>
              <CardTitle className="text-xl text-center">
                {currentStep === 1 && "Welcome to Career Compass"}
                {currentStep === 2 && "Educational Background"}
                {currentStep === 3 && "Your Location"}
              </CardTitle>
              <CardDescription className="text-center">
                {currentStep === 1 && "Let's get to know you better"}
                {currentStep === 2 && "Tell us about your education"}
                {currentStep === 3 && "Where are you located?"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit}>
                {renderForm()}
              </form>
              
              <div className="mt-6 flex justify-between items-center">
                <div className="flex gap-1">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-2 h-2 rounded-full ${
                        currentStep === step
                          ? 'bg-primary'
                          : currentStep > step
                          ? 'bg-primary/50'
                          : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Step {currentStep} of 3
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              {currentStep > 1 ? (
                <Button 
                  variant="outline" 
                  onClick={handleBack} 
                  type="button"
                  className="hover:bg-primary/10 hover:text-primary hover:shadow-md active:scale-95 transition-all"
                >
                  Back
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')} 
                  type="button"
                  className="hover:bg-primary/10 hover:text-primary hover:shadow-md active:scale-95 transition-all"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              )}
              
              {currentStep < 3 ? (
                <Button 
                  onClick={handleNext} 
                  type="button"
                  className="hover:bg-primary/90 hover:shadow-md active:scale-95 transition-all"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  type="submit"
                  className="hover:bg-primary/90 hover:shadow-md active:scale-95 transition-all"
                >
                  Complete
                </Button>
              )}
            </CardFooter>
          </Card>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default LoginPage;
