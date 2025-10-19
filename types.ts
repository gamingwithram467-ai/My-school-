// Defines the currently logged-in user's session data. This is a generic interface
// that holds the active user's information after a successful login, regardless of the source.
export interface User {
  name: string;
  email?: string;
  picture?: string;
  // The role determines which parts of the application the user can access.
  role?: 'Admin' | 'Teacher' | 'Student' | 'Secret';
}

// Defines the data structure for a teacher who signs up via the manual registration form.
// This data is stored in localStorage under 'registered_teachers'.
export interface RegisteredUser {
  fullName: string;
  email: string;
  password: string; // Note: In a real app, this should be a hash, not plaintext.
  subject: string;
}

// Defines the data structure for a privileged user (e.g., Admin, Supervisor)
// who signs up using a secret code. This allows for creating high-permission accounts
// without exposing a public registration form. Stored in 'secret_users'.
export interface SecretUser {
  username: string;
  password: string; // Note: In a real app, this should be a hash, not plaintext.
  role: string;
}

// Defines the data structure for a student who signs up via the student registration form.
// This data is stored in localStorage under 'registered_students'.
export interface StudentUser {
  fullName: string;
  email: string;
  password: string; // Note: In a real app, this should be a hash, not plaintext.
  className: string;
  rollNumber: string;
}