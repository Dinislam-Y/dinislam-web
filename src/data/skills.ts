import {
  SiDart,
  SiPython,
  SiPostgresql,
  SiGnubash,
  SiFlutter,
  SiFirebase,
  SiDocker,
  SiGitlab,
  SiPostman,
  SiLinux,
} from 'react-icons/si';
import { VscBeaker } from 'react-icons/vsc';
import { TbTestPipe } from 'react-icons/tb';
import {
  MdArchitecture,
  MdDevices,
  MdPhoneIphone,
  MdComputer,
  MdWeb,
} from 'react-icons/md';
import { FaCubes, FaLayerGroup } from 'react-icons/fa';
import { IconType } from 'react-icons';

export interface Skill {
  name: string;
  icon?: IconType;
}

export interface SkillCategory {
  key: string;
  skills: Skill[];
  gradient: string;
}

export const skillCategories: SkillCategory[] = [
  {
    key: 'languages',
    skills: [
      { name: 'Dart', icon: SiDart },
      { name: 'Python', icon: SiPython },
      { name: 'SQL', icon: SiPostgresql },
      { name: 'Bash', icon: SiGnubash },
    ],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    key: 'frameworks',
    skills: [
      { name: 'Flutter', icon: SiFlutter },
      { name: 'Patrol', icon: VscBeaker },
      { name: 'Mocktail', icon: TbTestPipe },
      { name: 'pytest', icon: SiPython },
      { name: 'BLoC', icon: FaCubes },
    ],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    key: 'testing',
    skills: [
      { name: 'Unit' },
      { name: 'Widget' },
      { name: 'Golden' },
      { name: 'E2E' },
      { name: 'API' },
      { name: 'Performance' },
      { name: 'Visual Regression' },
    ],
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    key: 'tools',
    skills: [
      { name: 'Docker', icon: SiDocker },
      { name: 'Firebase', icon: SiFirebase },
      { name: 'GitLab CI', icon: SiGitlab },
      { name: 'Allure', icon: FaLayerGroup },
      { name: 'Postman', icon: SiPostman },
      { name: 'Charles Proxy', icon: SiLinux },
    ],
    gradient: 'from-orange-500 to-red-500',
  },
  {
    key: 'architecture',
    skills: [
      { name: 'Clean Architecture', icon: MdArchitecture },
      { name: 'SOLID', icon: FaCubes },
      { name: 'Design Patterns', icon: FaLayerGroup },
    ],
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    key: 'platforms',
    skills: [
      { name: 'iOS', icon: MdPhoneIphone },
      { name: 'Android', icon: MdDevices },
      { name: 'Web', icon: MdWeb },
      { name: 'macOS', icon: MdComputer },
      { name: 'Cross-platform', icon: MdDevices },
    ],
    gradient: 'from-indigo-500 to-purple-500',
  },
];
