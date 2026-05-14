"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { createClient } from "@/lib/supabase/client"

interface SettingsProfile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  timezone: string | null
  email_notifications: boolean
  session_reminders: boolean
  product_updates: boolean
  role: string
}

interface SettingsFormProps {
  userId: string
  currentEmail: string
  profile: SettingsProfile
}

function isValidUrl(value: string): boolean {
  if (!value.trim()) {
    return true
  }

  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

export function SettingsForm({ userId, currentEmail, profile }: SettingsFormProps) {
  const router = useRouter()
  const [fullName, setFullName] = useState(profile.full_name ?? "")
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url ?? "")
  const [timezone, setTimezone] = useState(profile.timezone ?? "Africa/Lagos")
  const [emailNotifications, setEmailNotifications] = useState(profile.email_notifications)
  const [sessionReminders, setSessionReminders] = useState(profile.session_reminders)
  const [productUpdates, setProductUpdates] = useState(profile.product_updates)
  const [loginEmail, setLoginEmail] = useState(currentEmail)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isSavingSecurity, setIsSavingSecurity] = useState(false)
  const [profileError, setProfileError] = useState<string | null>(null)
  const [securityError, setSecurityError] = useState<string | null>(null)

  const saveProfile = async () => {
    setProfileError(null)

    if (fullName.trim().length < 2) {
      setProfileError("Enter your name so the dashboard can greet you properly.")
      return
    }

    if (!isValidUrl(avatarUrl)) {
      setProfileError("Avatar URL must be a valid URL or left blank.")
      return
    }

    setIsSavingProfile(true)

    try {
      const supabase = createClient()

      if (!supabase) {
        setProfileError("Profile settings are unavailable in this environment.")
        return
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName.trim(),
          avatar_url: avatarUrl.trim() || null,
          timezone: timezone.trim() || null,
          email_notifications: emailNotifications,
          session_reminders: sessionReminders,
          product_updates: productUpdates,
        })
        .eq("id", userId)

      if (error) {
        throw error
      }

      toast.success("Profile settings saved")
      router.refresh()
    } catch (error) {
      setProfileError(error instanceof Error ? error.message : "Could not save profile settings.")
    } finally {
      setIsSavingProfile(false)
    }
  }

  const saveSecurity = async () => {
    setSecurityError(null)

    const trimmedEmail = loginEmail.trim()
    if (!trimmedEmail) {
      setSecurityError("Email address cannot be empty.")
      return
    }

    if (newPassword || confirmPassword) {
      if (newPassword.length < 8) {
        setSecurityError("Password must be at least 8 characters.")
        return
      }

      if (newPassword !== confirmPassword) {
        setSecurityError("Passwords do not match.")
        return
      }
    }

    if (trimmedEmail === currentEmail && !newPassword) {
      setSecurityError("Change your email or set a new password before saving.")
      return
    }

    setIsSavingSecurity(true)

    try {
      const supabase = createClient()

      if (!supabase) {
        setSecurityError("Security settings are unavailable in this environment.")
        return
      }

      if (trimmedEmail !== currentEmail) {
        const { error } = await supabase.auth.updateUser({ email: trimmedEmail })
        if (error) {
          throw error
        }
      }

      if (newPassword) {
        const { error } = await supabase.auth.updateUser({ password: newPassword })
        if (error) {
          throw error
        }
      }

      toast.success(trimmedEmail === currentEmail ? "Password updated" : "Security changes submitted")
      setNewPassword("")
      setConfirmPassword("")
      router.refresh()
    } catch (error) {
      setSecurityError(error instanceof Error ? error.message : "Could not update security settings.")
    } finally {
      setIsSavingSecurity(false)
    }
  }

  const sendPasswordReset = async () => {
    setSecurityError(null)

    try {
      const supabase = createClient()

      if (!supabase) {
        setSecurityError("Password reset is unavailable in this environment.")
        return
      }

      const { error } = await supabase.auth.resetPasswordForEmail(loginEmail.trim(), {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        throw error
      }

      toast.success("Password reset email sent")
    } catch (error) {
      setSecurityError(error instanceof Error ? error.message : "Could not send password reset email.")
    }
  }

  const signOutEverywhere = async () => {
    setSecurityError(null)

    try {
      const supabase = createClient()

      if (!supabase) {
        setSecurityError("Sign out is unavailable in this environment.")
        return
      }

      const { error } = await supabase.auth.signOut({ scope: "global" })
      if (error) {
        throw error
      }

      toast.success("You have been signed out of all sessions")
      router.push("/")
      router.refresh()
    } catch (error) {
      setSecurityError(error instanceof Error ? error.message : "Could not sign out everywhere.")
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-[#E7E5E4] bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A8A29E]">Profile</p>
            <h2 className="mt-2 font-serif text-2xl text-[#1C1917]">Personal details and preferences</h2>
            <p className="mt-2 text-sm text-[#57534E]">
              This is what changes the experience people actually see in the dashboard and email updates.
            </p>
          </div>
          <div className="rounded-2xl border border-[#E7E5E4] bg-[#FAFAF9] px-4 py-3 text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-[#A8A29E]">Role</p>
            <p className="mt-1 text-sm font-medium text-[#1C1917]">{profile.role}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" value={fullName} onChange={(event) => setFullName(event.target.value)} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <Input id="timezone" value={timezone} onChange={(event) => setTimezone(event.target.value)} className="mt-2" placeholder="Africa/Lagos" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="avatarUrl">Avatar URL</Label>
            <Input id="avatarUrl" value={avatarUrl} onChange={(event) => setAvatarUrl(event.target.value)} className="mt-2" placeholder="https://example.com/avatar.jpg" />
            <p className="mt-2 text-xs text-[#78716C]">Optional. Used anywhere we show a profile image.</p>
            {avatarUrl ? (
              <div className="mt-3 flex items-center gap-3 rounded-2xl border border-[#E7E5E4] bg-[#FAFAF9] p-3">
                <img
                  src={avatarUrl}
                  alt="Avatar preview"
                  className="h-12 w-12 rounded-full object-cover"
                  onError={(event) => {
                    ;(event.currentTarget as HTMLImageElement).style.display = "none"
                  }}
                />
                <div>
                  <p className="text-sm font-medium text-[#1C1917]">Preview</p>
                  <p className="text-xs text-[#78716C]">The image must be publicly accessible.</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <label className="flex items-start gap-3 rounded-2xl border border-[#E7E5E4] p-4">
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            <span>
              <span className="block text-sm font-medium text-[#1C1917]">Email updates</span>
              <span className="block text-xs text-[#78716C]">Receive general account and progress emails.</span>
            </span>
          </label>
          <label className="flex items-start gap-3 rounded-2xl border border-[#E7E5E4] p-4">
            <Switch checked={sessionReminders} onCheckedChange={setSessionReminders} />
            <span>
              <span className="block text-sm font-medium text-[#1C1917]">Session reminders</span>
              <span className="block text-xs text-[#78716C]">Get reminders before upcoming coaching sessions.</span>
            </span>
          </label>
          <label className="flex items-start gap-3 rounded-2xl border border-[#E7E5E4] p-4">
            <Switch checked={productUpdates} onCheckedChange={setProductUpdates} />
            <span>
              <span className="block text-sm font-medium text-[#1C1917]">Product updates</span>
              <span className="block text-xs text-[#78716C]">Hear about new features and improvements.</span>
            </span>
          </label>
        </div>

        {profileError ? <p className="mt-4 text-sm text-red-600">{profileError}</p> : null}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button type="button" onClick={saveProfile} disabled={isSavingProfile}>
            {isSavingProfile ? "Saving profile..." : "Save profile settings"}
          </Button>
          <p className="text-sm text-[#78716C]">Changes apply to your dashboard, profile row, and future messages.</p>
        </div>
      </section>

      <section className="rounded-[28px] border border-[#E7E5E4] bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A8A29E]">Security</p>
        <h2 className="mt-2 font-serif text-2xl text-[#1C1917]">Login email and password</h2>
        <p className="mt-2 text-sm text-[#57534E]">
          These actions actually talk to Supabase Auth. Email changes will require confirmation from the new address.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <Label htmlFor="loginEmail">Login email</Label>
            <Input id="loginEmail" type="email" value={loginEmail} onChange={(event) => setLoginEmail(event.target.value)} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="newPassword">New password</Label>
            <Input id="newPassword" type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="mt-2" placeholder="Leave blank to keep current password" />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm new password</Label>
            <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-2" placeholder="Repeat the new password" />
          </div>
        </div>

        {securityError ? <p className="mt-4 text-sm text-red-600">{securityError}</p> : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" onClick={saveSecurity} disabled={isSavingSecurity}>
            {isSavingSecurity ? "Updating security..." : "Update email / password"}
          </Button>
          <Button type="button" variant="outline" onClick={sendPasswordReset}>
            Send password reset email
          </Button>
          <Button type="button" variant="outline" onClick={signOutEverywhere}>
            Sign out everywhere
          </Button>
        </div>
      </section>
    </div>
  )
}
