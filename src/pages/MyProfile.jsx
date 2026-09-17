import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { shopContext } from "../context/shopContext";
import axios from "axios";
import { toast } from "react-toastify";
import SEO from "../components/SEO";

const MyProfile = () => {
  const { backendUrl, token, navigate } = useContext(shopContext);

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // User Profile Data State
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
    },
  });

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  // Protect route and load initial profile data
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchUserProfile();
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        backendUrl + "/api/user/get-profile",
        {},
        { headers: { token } },
      );

      if (response.data.success && response.data.user) {
        const user = response.data.user;
        setUserData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || {
            street: "",
            city: "",
            state: "",
            country: "",
            zipcode: "",
          },
        });
      } else {
        toast.error(response.data.message || "Failed to load profile details.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching profile details.");
    } finally {
      setLoading(false);
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const onAddressChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const response = await axios.post(
        backendUrl + "/api/user/update-profile",
        userData,
        { headers: { token } },
      );

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/user/update-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        { headers: { token } },
      );

      if (response.data.success) {
        toast.success("Password changed successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setShowPasswordSection(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update password.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <SEO
          title="Marine Box | Buy Containers, Shipping"
          description="Marine Box is your trusted online destination for high-quality containers world wide. Shop dry storage, refrigerated reefers, and custom conversions with secure payments and fast delivery."
          keywords="Marine Box, online shopping,"
          url="https://www.marine-box.com"
        />

        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-teal-500"></div>
        <p className="text-slate-500 text-sm font-semibold">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Top Header */}
      <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-800 mb-8 border-b border-slate-100 pb-4">
        <Title text1={"MY"} text2={"PROFILE"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Quick Actions Card */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
            {/* User Avatar Circle */}
            <div className="w-24 h-24 rounded-full bg-gray-600 text-white flex items-center justify-center text-3xl font-bold shadow-md mb-4">
              {userData.name ? userData.name.charAt(0).toUpperCase() : "U"}
            </div>

            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              {userData.name || "SnapBuy User"}
            </h2>
            <p className="text-xs font-medium text-slate-500 mb-6">
              {userData.email}
            </p>

            <div className="w-full flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isEditing
                    ? "bg-slate-200 text-slate-800 hover:bg-slate-300"
                    : "bg-teal-500 hover:bg-teal-600 text-white shadow-sm"
                }`}
              >
                {isEditing ? "Cancel Editing" : "Edit Profile"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/orders")}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-sm font-semibold transition-all duration-150 cursor-pointer"
              >
                My Orders
              </button>
            </div>
          </div>

          {/* Quick Security Box */}
          <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
              Account Security
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Keep your password secure and update it periodically.
            </p>
            <button
              type="button"
              onClick={() => setShowPasswordSection(!showPasswordSection)}
              className="text-xs text-teal-600 font-bold hover:underline cursor-pointer"
            >
              {showPasswordSection ? "Hide Security Form" : "Change Password →"}
            </button>
          </div>
        </div>

        {/* Right Column: Editable Details & Forms */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Main Details Form */}
          <form
            onSubmit={handleProfileUpdate}
            className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-800">
                Personal Information
              </h3>
              {isEditing && (
                <span className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                  Editing Mode
                </span>
              )}
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={onChangeHandler}
                  disabled={!isEditing}
                  required
                  className="border border-slate-200 disabled:bg-slate-50 disabled:text-slate-600 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none rounded-xl py-2.5 px-4 text-sm font-semibold transition-all duration-150"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  disabled
                  className="border border-slate-200 bg-slate-50 text-slate-400 outline-none rounded-xl py-2.5 px-4 text-sm font-semibold cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-500">
                  Mobile Money Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={onChangeHandler}
                  disabled={!isEditing}
                  placeholder="e.g., 6XXXXXXXX"
                  className="border border-slate-200 disabled:bg-slate-50 disabled:text-slate-600 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none rounded-xl py-2.5 px-4 text-sm font-semibold transition-all duration-150"
                />
              </div>
            </div>

            {/* Address Details */}
            <div className="border-t border-slate-100 pt-6 flex flex-col gap-4">
              <h3 className="text-md font-bold text-slate-800">
                Default Delivery Address
              </h3>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500">
                  Street / Quarter
                </label>
                <input
                  type="text"
                  name="street"
                  value={userData.address.street}
                  onChange={onAddressChangeHandler}
                  disabled={!isEditing}
                  placeholder="Street address or Quarter location"
                  className="border border-slate-200 disabled:bg-slate-50 disabled:text-slate-600 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none rounded-xl py-2.5 px-4 text-sm font-semibold transition-all duration-150"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={userData.address.city}
                    onChange={onAddressChangeHandler}
                    disabled={!isEditing}
                    placeholder="City"
                    className="border border-slate-200 disabled:bg-slate-50 disabled:text-slate-600 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none rounded-xl py-2.5 px-4 text-sm font-semibold transition-all duration-150"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500">
                    State / Region
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={userData.address.state}
                    onChange={onAddressChangeHandler}
                    disabled={!isEditing}
                    placeholder="Region or State"
                    className="border border-slate-200 disabled:bg-slate-50 disabled:text-slate-600 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none rounded-xl py-2.5 px-4 text-sm font-semibold transition-all duration-150"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={userData.address.country}
                    onChange={onAddressChangeHandler}
                    disabled={!isEditing}
                    placeholder="Country"
                    className="border border-slate-200 disabled:bg-slate-50 disabled:text-slate-600 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none rounded-xl py-2.5 px-4 text-sm font-semibold transition-all duration-150"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500">
                    Zip Code (Optional)
                  </label>
                  <input
                    type="text"
                    name="zipcode"
                    value={userData.address.zipcode}
                    onChange={onAddressChangeHandler}
                    disabled={!isEditing}
                    placeholder="Zip Code"
                    className="border border-slate-200 disabled:bg-slate-50 disabled:text-slate-600 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none rounded-xl py-2.5 px-4 text-sm font-semibold transition-all duration-150"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-slate-900 hover:bg-slate-800 active:scale-95 text-white text-sm font-semibold px-8 py-3 rounded-xl shadow-md transition-all duration-150 cursor-pointer disabled:opacity-50"
                >
                  {saving ? "Saving Changes..." : "Save Profile"}
                </button>
              </div>
            )}
          </form>

          {/* Password Update Form (Toggled) */}
          {showPasswordSection && (
            <form
              onSubmit={handlePasswordChange}
              className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-4 animate-fade-in"
            >
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">
                Update Security Password
              </h3>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  required
                  className="border border-slate-200 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none rounded-xl py-2.5 px-4 text-sm font-semibold transition-all duration-150"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    required
                    className="border border-slate-200 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none rounded-xl py-2.5 px-4 text-sm font-semibold transition-all duration-150"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                    className="border border-slate-200 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none rounded-xl py-2.5 px-4 text-sm font-semibold transition-all duration-150"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-sm transition-all duration-150 cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
