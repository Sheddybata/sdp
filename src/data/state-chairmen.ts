export interface StateChairman {
  zone: 'SW' | 'SE' | 'SS' | 'NE' | 'NC' | 'NW';
  state: string;
  chairman: string;
  phone: string;
}

export const stateChairmen: StateChairman[] = [
  { zone: 'SW', state: 'Lagos', chairman: 'Hon. Femi Olaniyi', phone: '+234 812 222 5309' },
  { zone: 'SW', state: 'Ogun', chairman: 'Mr. Yinka William', phone: '+234 703 225 9966' },
  { zone: 'SW', state: 'Ekiti', chairman: 'Amb Tope Olofin', phone: '+234 803 485 4404' },
  { zone: 'SW', state: 'Ondo', chairman: 'Barr. Gbenga Akinbuli', phone: '+234 806 477 0814' },
  { zone: 'SW', state: 'Osun', chairman: 'Alh. Yunus Gbadamosi', phone: '+234 803 499 2655' },
  { zone: 'SW', state: 'Oyo', chairman: 'Mike Aderoju Okunlade', phone: '+234 803 379 6111' },
  { zone: 'SE', state: 'Abia', chairman: 'Hon. Uba Ekeagbara Obasi', phone: '+234 803 707 5211' },
  { zone: 'SE', state: 'Anambra', chairman: 'Hon. Chinedu Ekwunife', phone: '+234 814 663 0603' },
  { zone: 'SE', state: 'Ebonyi', chairman: 'Dr Kingsley Agbo', phone: '+234 803 873 9150' },
  { zone: 'SE', state: 'Enugu', chairman: 'Hon. Friday Iloka', phone: '+234 706 803 3832' },
  { zone: 'SE', state: 'Imo', chairman: 'Engr. Augustine Okere', phone: '+234 803 311 0216' },
  { zone: 'SS', state: 'Akwa Ibom', chairman: 'Hon. Willington Odiong', phone: '+234 802 435 9005' },
  { zone: 'SS', state: 'Bayelsa', chairman: 'Hon. Allen Amadein', phone: '+234 703 611 7545' },
  { zone: 'SS', state: 'Cross River', chairman: 'Mr. Fidelis Akpanke', phone: '+234 703 455 6909' },
  { zone: 'SS', state: 'Delta', chairman: 'Mr. Felix Obuseh', phone: '+234 816 857 7819' },
  { zone: 'SS', state: 'Edo', chairman: 'Hon. Roland Kelly', phone: '+234 913 625 7736' },
  { zone: 'SS', state: 'Rivers', chairman: 'Barr. Nimi Isokariari', phone: '+234 803 095 0385' },
  { zone: 'NE', state: 'Adamawa', chairman: 'Hon. Paul Ahundana', phone: '+234 706 367 3643' },
  { zone: 'NE', state: 'Borno', chairman: 'Alh. Abba Modu', phone: '+234 906 868 1600' },
  { zone: 'NE', state: 'Bauchi', chairman: 'Muhammed Khamisu', phone: '+234 802 126 0880' },
  { zone: 'NE', state: 'Gombe', chairman: 'Sani Abubukar Wagga', phone: '+234 706 161 6661' },
  { zone: 'NE', state: 'Taraba', chairman: 'Alh Ali Yusuf', phone: '+234 813 426 2309' },
  { zone: 'NE', state: 'Yobe', chairman: 'Alh. Abba Bature', phone: '+234 904 335 4046' },
  { zone: 'NC', state: 'Kogi', chairman: 'Alh. Ahmed Attah', phone: '+234 806 856 7120' },
  { zone: 'NC', state: 'Benue', chairman: 'Hon. Itodo Idoko', phone: '+234 803 800 5396' },
  { zone: 'NC', state: 'Kwara', chairman: 'Barr. Sharafadeen Ibrahim', phone: '+234 803 358 7312' },
  { zone: 'NC', state: 'Nasarawa', chairman: 'Barr. Ibrahim Ajegana', phone: '+234 816 246 6666' },
  { zone: 'NC', state: 'Niger', chairman: 'Barr. B.Y. Yarima', phone: '+234 803 638 1601' },
  { zone: 'NC', state: 'Plateau', chairman: 'Hon. Ramejo Ramnan Lokkap', phone: '+234 818 884 4888' },
  { zone: 'NC', state: 'FCT', chairman: 'Mohammed Baba Sani', phone: '+234 803 679 5610' },
  { zone: 'NW', state: 'Kebbi', chairman: 'Alh. Shehu Abdullahi', phone: '+234 813 795 8987' },
  { zone: 'NW', state: 'Jigawa', chairman: 'Alhassan Umar Makaddari', phone: '+234 916 852 7001' },
  { zone: 'NW', state: 'Kaduna', chairman: 'Alh. Idris Adamu', phone: '+234 803 450 5389' },
  { zone: 'NW', state: 'Kano', chairman: 'Alh. Aminu Shugaba', phone: '+234 803 914 3932' },
  { zone: 'NW', state: 'Katsina', chairman: 'Hon Bello Safana', phone: '+234 705 260 9343' },
  { zone: 'NW', state: 'Sokoto', chairman: 'Alh. Ahmad Maidama', phone: '+234 803 471 0049' },
  { zone: 'NW', state: 'Zamfara', chairman: 'Arc. Bilal Aliyu', phone: '+234 806 090 7399' }
];
