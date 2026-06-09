import {
  Cpu,
  Handshake,
  MessagesSquare,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react'

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Event', href: '#event' },
  { label: 'FAQ', href: '#faq' },
]

export const eventFeatures = [
  {
    title: 'Overnight Coding',
    description:
      'Build through the night inside a neon-lit environment designed for focus, flow, and momentum.',
    icon: Cpu,
  },
  {
    title: 'Team Collaboration',
    description:
      'Form squads, divide the mission, and ship something sharper than a concept deck.',
    icon: Users,
  },
  {
    title: 'Innovation Challenges',
    description:
      'Tackle prompts engineered to reward bold ideas, smart execution, and product thinking.',
    icon: Sparkles,
  },
  {
    title: 'Mentorship Access',
    description:
      'Get guidance from builders who can help you unblock, refine, and level up fast.',
    icon: MessagesSquare,
  },
  {
    title: 'Networking Sessions',
    description:
      'Meet creators, founders, and peers who care about building ambitious things together.',
    icon: Handshake,
  },
  {
    title: 'Exclusive Prizes',
    description:
      'Compete for rewards that celebrate the best work, not just the loudest pitch.',
    icon: Trophy,
  },
]

export const highlights = [
  'Overnight coding experience',
  'Team collaboration',
  'Innovation challenges',
  'Mentorship opportunities',
  'Networking sessions',
  'Exciting prizes',
]

export const faqs = [
  {
    question: 'Who can participate?',
    answer:
      'Students, aspiring builders, designers, and developers who want to create within a high-energy hackathon setting.',
  },
  {
    question: 'Is there a registration fee?',
    answer:
      'The event is designed to be accessible. Any fee details can be communicated by the organizers before registration opens.',
  },
  {
    question: 'Can I join without a team?',
    answer: 'No. You are required to participate as a team',
  },
  {
    question: 'What should I bring?',
    answer:
      'Bring your laptop, charger, student ID, and anything you need to stay productive overnight.',
  },
  {
    question: 'Will food be provided?',
    answer:
      'A hackathon-ready hospitality plan is expected, including refreshments and meal support during the event window.',
  },
  {
    question: 'How long is the event?',
    answer:
      'Hack To Night 2026 is planned as an overnight experience with a full build cycle, judging, and closing showcase.',
  },
]

export const footerLinks = [
  { label: 'GitHub', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Email', href: '#' },
]

export const stats = [
  { value: '01', label: 'Night. One mission.' },
  { value: '24+', label: 'Hours of momentum' },
  { value: '06', label: 'Feature zones' },
  { value: '∞', label: 'Ideas in the grid' },
]

export const registrationFields = [
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'user@students.nsbm.ac.lk',
  },
  {
    label: 'Team Name',
    name: 'teamName',
    type: 'text',
    placeholder: 'Team Hack',
  },
  {
    label: 'Contact Number',
    name: 'phone',
    type: 'tel',
    placeholder: '07XXXXXXXX',
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: 'XXXXXXXXX',
  },
  {
    label: 'Confirm Password',
    name: 'confpassword',
    type: 'password',
    placeholder: 'XXXXXXXXX',
  },
]
