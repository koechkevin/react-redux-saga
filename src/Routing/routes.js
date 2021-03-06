import Staff from '../views/Staff/index';
import Employee from '../views/Staff/SingleStaff';
import NewStaff from '../views/Staff/NewStaff';
import EditStaff from '../views/Staff/EditStaff';
import Students from '../views/Students/index';
import SingleStudent from '../views/Students/component/SingleStudent';


export default [
  {
    path: '/staff',
    component: Staff,
    allowedRoles: ['Super Admin']
  }, {
    path: '/staff/:idNumber',
    component: Employee,
    allowedRoles: ['Super Admin']
  }, {
    path: '/staff/employee/create',
    component: NewStaff,
    allowedRoles: ['Super Admin']
  }, {
    path: '/staff/:idNumber/update',
    component: EditStaff,
    allowedRoles: ['Super Admin']
  }, {
    path: '/students',
    component: Students,
    allowedRoles: ['Super Admin', 'Teacher', 'Manager']
  }, {
    path: '/students/:admission',
    component: SingleStudent,
    allowedRoles: ['Super Admin', 'Teacher', 'Manager']
  }
];
