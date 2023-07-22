import { CgGoogleTasks } from 'react-icons/cg'
import { FaTasks } from 'react-icons/fa'
import { MdPendingActions,MdDoneAll } from 'react-icons/md'
import { SiOpenaccess } from 'react-icons/si'
import { CgProfile } from 'react-icons/cg'
import { VscFeedback } from 'react-icons/vsc'
import { RiAddLine } from 'react-icons/ri'
import { FaUserAlt } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'


export const employeeMenus = [
                        { title: 'Tasks', path: '/dashboard/task', src: <CgGoogleTasks /> },
                        { title: 'On-Going', path: '/dashboard/ongoing', src: <FaTasks /> },
                        { title: 'Pending', path: '/dashboard/pending', src: <MdPendingActions /> },
                        { title: 'Complete', path: '/dashboard/complete', src: <MdDoneAll /> },
                        { title: 'Profile', path: '/dashboard/profile', src: <CgProfile />, gap:'true' },
                        { title: 'Contact Us', path: '/dashboard/contact', src: <VscFeedback /> },
                        { title: 'Log Out', path: '/', src: <SiOpenaccess />, gap:'true'},
                      ]

export const adminMenus = [
                        { title: 'Create Task', path: '/dashboard/createtask', src: <RiAddLine />,},
                        { title: 'Tasklist', path: '/dashboard/tasklist', src: <CgGoogleTasks /> },
                        { title: 'Employees', path: '/dashboard/employees', src: <FaUserAlt /> },
                        { title: 'Dashboard', path: '/dashboard/data', src: <MdDashboard /> },
                        { title: 'On-Going', path: '/dashboard/ongoing', src: <FaTasks /> },
                        { title: 'Pending', path: '/dashboard/pending', src: <MdPendingActions /> },
                        { title: 'Complete', path: '/dashboard/complete', src: <MdDoneAll /> },
                        { title: 'Profile', path: '/dashboard/profile', src: <CgProfile />, gap:'true' },
                        { title: 'Log Out', path: '/', src: <SiOpenaccess />, gap:'true'},
                      ]