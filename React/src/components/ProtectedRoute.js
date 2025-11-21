import React from 'react';
import { Navigate } from 'react-router-dom';
import { getLoggedInUserDetails } from 'src/utils/common';

/**
 * ProtectedRoute Component
 * Restricts access to routes based on user role
 *
 * Usage:
 * <Route path="/admin-only" element={<ProtectedRoute element={<AdminPanel />} requiredRole="ADMIN" />} />
 * <Route path="/faculty-only" element={<ProtectedRoute element={<FacultyDashboard />} requiredRole="FACULTY" />} />
 * <Route path="/any-role" element={<ProtectedRoute element={<CoursePage />} requiredRole={["STUDENT", "FACULTY"]} />} />
 */
const ProtectedRoute = ({ element, requiredRole }) => {
  const userDetails = getLoggedInUserDetails();

  // If not logged in, redirect to login
  if (!userDetails || !userDetails.userTypeCode) {
    return <Navigate to="/auth/login" replace />;
  }

  // Convert requiredRole to array for easier checking
  const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

  // Check if user has required role
  if (!allowedRoles.includes(userDetails.userTypeCode)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User has required role, render the component
  return element;
};

export default ProtectedRoute;
