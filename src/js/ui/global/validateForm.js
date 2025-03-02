export function getValidation(name, email, password, repeatPassword) {
  let errors = [];
  let invalidFields = [];

  if (name !== undefined && name !== '') {
    const namePattern = /^[a-zA-Z0-9_]+$/;
    if (name.trim() === '') {
      errors.push('Name is required');
      invalidFields.push('name');
    } else if (name.length > 20) {
      errors.push('Name must be less than 20 characters.');
      invalidFields.push('name');
    } else if (!namePattern.test(name)) {
      errors.push(
        'The name value must not contain punctuation symbols apart from underscore (_).',
      );
      invalidFields.push('name');
    }
  }

  // Email validation
  const emailPattern = /^[\w\-.]+@(stud\.)?noroff\.no$/;
  if (!email || email.trim() === '') {
    errors.push('Email is required');
    invalidFields.push('email');
  } else if (!emailPattern.test(email)) {
    errors.push('Email must be a valid @stud.noroff.no email.');
    invalidFields.push('email');
  }

  // Password validation
  if (!password || password.trim() === '') {
    errors.push('Password is required');
    invalidFields.push('password');
  } else if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
    invalidFields.push('password');
  } else if (/\s/.test(password)) {
    errors.push('Password cannot contain spaces');
    invalidFields.push('password');
  }

  // Password match validation
  if (repeatPassword !== undefined && repeatPassword !== '') {
    if (password !== repeatPassword) {
      errors.push('Passwords do not match');
      invalidFields.push('password');
      invalidFields.push('repeatPassword');
    }
  }

  return { errors, invalidFields };
}
