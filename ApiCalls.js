const url = "https://authspark-kg5d.vercel.app/project-users";

export const signupUser = async (email, password, apiKey) => {
  try {
    const response = await fetch(`${url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, apiKey })
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {

      const error = await response.json();
      console.error("Signup error:", error.message || error);
      return false;
    }
  } catch (error) {
    console.error("Signup failed:", error);
    return false;
  }
};

export const loginUser = async (email, password, apiKey) => {
  try {
    const response = await fetch(`${url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, apiKey })
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {

      const error = await response.json();
      console.error("Login error:", error.message || error);
      return false;
    }
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};


export const getUserData = async (apiKey) => {
  try {
    const token = localStorage.getItem('profile');
    if (!token) return false;

    const response = await fetch(`${url}/get-user-info`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ apiKey })
    });

    if (response.status === 401) return 401;
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const err = await response.json();
      console.error("Error getting user info:", err.message || err);
      return false;
    }
  } catch (error) {
    console.error("Request failed:", error);
    return false;
  }
};


export const setMetadataOfUser = async (metadata, apiKey) => {
  const token = localStorage.getItem('profile');
  if (!token) return false;
  try {
    const response = await fetch(`${url}/update-metadata`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ metadata, apiKey })
    });

    if (response.status === 401) return 401;
   


    if (response.ok) {
      return true
    }
    else return false;

  } catch (error) {

    return false;
  }
}


export const toggleUser = async (apiKey, active) => {
  const token = localStorage.getItem('profile');
  if (!token) return false;
  try {
    const response = await fetch(`${url}/toggle-active-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ active: active, apiKey, token }),
      keepalive: true
    })

    return true;
  } catch (error) {
    return false;
  }
}



