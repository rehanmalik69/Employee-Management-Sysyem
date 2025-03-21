# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Express server setup with CORS middleware
- Basic frontend routes setup with React Router
- Admin Dashboard with dark/light theme support
- Employee management functionality
- Project management system
- Meeting scheduler
- Settings page with appearance customization
- Report generation functionality
- Responsive sidebar navigation
- Quick actions dashboard widgets
- User authentication flow
- Profile management
- Security settings with 2FA options
- Notification preferences
- Custom theme system with dynamic colors
- Layout density controls
- Task overview dashboard with real-time statistics
- Task filtering by time period (Today/Week/Month)
- Dynamic task completion rate calculation
- Task status tracking (Completed/In Progress/Overdue)
- Comparative task metrics with previous periods
- Enhanced dropdown styling for better visibility
- Task progress indicators with status-based colors
- New leave management section with statistics and request handling
- New salary management section with payroll processing
- Routes for leaves and salary pages in App.jsx
- Custom styled dropdown menus across dashboard
- Month picker for salary management
- Leave request approval/rejection workflow
- Salary processing and payment tracking
- Leave and salary statistics cards
- Modal forms for new leave requests and salary processing

### Fixed
- Schedule meeting button in dashboard now correctly opens modal instead of navigating
- Navigation handling in SidebarItem component
- Event propagation issues in QuickActionCard component
- Theme application and persistence
- Task overview dropdown visibility and styling
- Time period selector contrast issues
- Task statistics calculation accuracy
- Dropdown menu styling consistency across all sections
- Navigation handling for new sections
- Modal form submission workflows
- Authentication persistence issue requiring "Remember Me" checkbox
- Login state management for admin and employee dashboards
- Session handling consistency across application
- Credential storage separation from authentication state

### Changed
- Improved modal UI components
- Enhanced form validations
- Optimized state management
- Updated styling system with CSS variables
- Refined component architecture
- Improved task filtering logic
- Enhanced task overview UI components
- Optimized task data management
- Updated navigation sidebar to include leaves and salary sections
- Enhanced dropdown styling with custom arrows and hover effects
- Improved table layouts for leave requests and salary records
- Optimized form layouts in modals
- Updated login flow to always store authentication state
- Separated credential storage from session management
- Optimized login state persistence logic
- Enhanced Remember Me functionality to only store credentials

### Pending
- Backend API implementation
- Database integration
- File upload functionality
- Real-time notifications
- Email integration for meeting reminders
- PDF report generation
- User roles and permissions system
- Data pagination
- Search optimization
- Activity logging
