export const validateform = (email, password) => {
    const isEmailvalid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    const ispasswordvalid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(password)

    if (!isEmailvalid) return "Email is not valid"
    if (!ispasswordvalid) return "Password is not valid"
    return null;
}