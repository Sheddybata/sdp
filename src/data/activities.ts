/** Party activities / visits — images live under /public/Latest wins/ */
export interface ActivityItem {
  id: string;
  title: string;
  body: string;
  image: string;
  category?: string;
}

export const ACTIVITIES: ActivityItem[] = [
  {
    id: 'ibb-birthday',
    title: 'SDP National Leaders Visit to IBB',
    body:
      'The leadership of the Social Democratic Party (SDP) paid a courtesy visit to General Ibrahim Badamasi Babangida (rtd) in Minna as part of celebrations marking his 84th birthday. The delegation used the occasion to reaffirm the party\'s respect for elder statesmen who have shaped Nigeria\'s political history and to discuss national unity, inclusive governance, and the role of opposition parties in strengthening democracy. National Working Committee members emphasised SDP\'s commitment to issue-based politics and wished the former Head of State good health and continued service to the nation through counsel and mentorship.',
    image: '/Latest wins/SDP National Leaders Visit to IBB.jpeg',
    category: 'Courtesy',
  },
  {
    id: 'ibb-abdulsalami-minna',
    title: 'SDP leaders visit IBB, Abdulsalami in Minna',
    body:
      'Leaders of the Social Democratic Party undertook a significant engagement in Minna, Niger State, visiting former military President General Ibrahim Badamasi Babangida (rtd) and former Head of State General Abdulsalami Abubakar (rtd). The visits formed part of SDP\'s ongoing dialogue with respected national figures on security, reconciliation, and credible leadership ahead of future electoral cycles. Party officials highlighted SDP\'s grassroots structure and policy priorities, while listening to perspectives on stabilising the country and deepening trust between citizens and political institutions.',
    image: '/Latest wins/SDP leaders visit IBB, Abdulsalami in Minna.jpg',
    category: 'Engagement',
  },
  {
    id: 'mulkat-akanbi',
    title: 'Visit by Rt. Hon. Alhaja Mulkat Adeola Akanbi',
    body:
      'Rt. Hon. Alhaja Mulkat Adeola Akanbi, former Majority Leader of the House of Representatives, visited the SDP National Working Committee (NWC) at the national headquarters in Abuja. The meeting underscored growing interest from experienced legislators in SDP\'s platform for women\'s leadership and legislative excellence. Discussions covered party organisation, coalition-building, and strengthening parliamentary ties with the party\'s policy teams. The NWC welcomed the visit as part of broader efforts to broaden SDP\'s national profile and deepen relationships across the political spectrum.',
    image: '/Latest wins/Visit by Rt. Hon. Alhaja Mulkat Adeola Akanbi.png',
    category: 'Parliament',
  },
  {
    id: 'emir-lafia',
    title: 'Courtesy visit to the Emir of Lafia',
    body:
      'SDP national leaders and stakeholders were received at the palace of the Emir of Lafia for an Iftar programme, bringing together party officials, community representatives, and traditional authority in a spirit of unity and reflection. The gathering reinforced SDP\'s respect for traditional institutions as pillars of local governance and social cohesion. Conversations touched on peace-building, youth engagement, and inclusive development in Nasarawa State. The party expressed gratitude for the Emir\'s hospitality and pledged continued partnership with communities in the state.',
    image: '/Latest wins/Courtesy visit to the emir of lafia.jpeg',
    category: 'Traditional institutions',
  },
  {
    id: 'nwc-bulletin',
    title: 'SDP National Secretariat Bulletin',
    body:
      'Major Hamza Almustafa paid a courtesy visit to the SDP National Working Committee (NWC) at the national headquarters in Abuja, under the leadership of Ag. National Chairman Prof. Sadiq Umar Abubakar Gombe. The session provided an opportunity to exchange views on party administration, membership growth, and coordination between the secretariat and supporting structures. Officials reviewed recent NWC decisions and communication priorities, reaffirming transparency and discipline as core to SDP\'s operations at the centre.',
    image: '/Latest wins/SDP National Secretariat Bulletin.jpeg',
    category: 'Secretariat',
  },
  {
    id: 'adebayo-iftar-2023',
    title: 'Courtesy visit to SDP Presidential Candidate of 2023',
    body:
      'During an Iftar programme, party leaders and members gathered with SDP\'s 2023 Presidential Candidate, Prince Adewole Adebayo, in a cordial setting focused on gratitude, solidarity, and renewal of commitment to the party\'s values. The event highlighted SDP\'s continued engagement with its standard-bearer and supporters after the election cycle, with emphasis on policy advocacy, youth inclusion, and building towards future contests. Participants reflected on lessons learned and the importance of maintaining a visible, principled opposition voice in Nigeria\'s democracy.',
    image: '/Latest wins/Courtesy visit to SDP presidential candidate of 2023.jpeg',
    category: 'Leadership',
  },
];
