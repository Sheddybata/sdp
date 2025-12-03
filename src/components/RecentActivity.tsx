import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, MapPin, Clock } from 'lucide-react';

interface Activity {
  id: number;
  name: string;
  location: string;
  time: string;
  type: 'joined' | 'donated' | 'volunteered';
}

const generateActivities = (): Activity[] => {
  const names = [
    'Adebayo Ogunleye', 'Fatima Ibrahim', 'Chukwuemeka Nwosu', 'Amina Hassan',
    'Ibrahim Musa', 'Chinwe Okoro', 'Mohammed Bello', 'Grace Adeyemi',
    'Emeka Okafor', 'Hauwa Abdullahi', 'Segun Adebayo', 'Maryam Usman'
  ];
  const locations = [
    'Lagos', 'Kano', 'Abuja', 'Rivers', 'Oyo', 'Kaduna', 'Enugu', 'Delta',
    'Plateau', 'Sokoto', 'Anambra', 'Bauchi'
  ];
  const times = ['Just now', '2 mins ago', '5 mins ago', '10 mins ago', '15 mins ago', '20 mins ago'];

  return Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: names[Math.floor(Math.random() * names.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    time: times[Math.floor(Math.random() * times.length)],
    type: ['joined', 'donated', 'volunteered'][Math.floor(Math.random() * 3)] as Activity['type']
  }));
};

const RecentActivity: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>(generateActivities());

  useEffect(() => {
    const interval = setInterval(() => {
      setActivities(prev => {
        const newActivity = generateActivities()[0];
        return [newActivity, ...prev.slice(0, 7)];
      });
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'joined':
        return <UserPlus className="w-4 h-4 text-[#1daa62]" />;
      case 'donated':
        return <span className="text-[#ef8636] font-bold">₦</span>;
      case 'volunteered':
        return <span className="text-[#ef8636]">✓</span>;
    }
  };

  const getActivityText = (type: Activity['type']) => {
    switch (type) {
      case 'joined':
        return 'joined the party';
      case 'donated':
        return 'made a donation';
      case 'volunteered':
        return 'signed up to volunteer';
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sdp-dark">Recent Activity</h2>
          <p className="text-gray-600">Live updates from our growing community</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border-b last:border-b-0"
                >
                  <div className="w-10 h-10 bg-[#ef8636]/10 rounded-full flex items-center justify-center">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-semibold text-sdp-dark">{activity.name}</span>
                      {' '}
                      <span className="text-gray-600">{getActivityText(activity.type)}</span>
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{activity.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                <span className="w-2 h-2 bg-[#1daa62] rounded-full inline-block mr-2 animate-pulse"></span>
                Live updates refresh every 15 seconds
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RecentActivity;



