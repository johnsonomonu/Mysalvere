import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/guards"
import { Briefcase, CheckCircle2, XCircle } from "lucide-react"
import { ServiceForm } from "@/components/admin/service-form"
import { AddServiceModal } from "@/components/admin/add-service-modal"

export default async function AdminServicesPage() {
  await requireAdmin()
  const supabase = await createClient()

  if (!supabase) return <div>Supabase not configured</div>

  const { data: services } = await supabase
    .from('services_config')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#78716C]">Operations</p>
          <h2 className="mt-2 font-serif text-3xl text-[#1C1917]">Service Offerings</h2>
          <p className="mt-2 text-sm text-[#57534E]">
            Manage pricing, descriptions, and visibility of your wellness packages.
          </p>
        </div>
        <AddServiceModal />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {services?.map((service) => (
          <div key={service.id} className="rounded-[2.5rem] border border-[#E7E5E4] bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden group">
            {service.is_featured && (
              <div className="absolute top-0 right-0 px-6 py-2 bg-[var(--orange)] text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-3xl">
                Featured
              </div>
            )}
            
            <div className="flex items-start justify-between mb-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--warm-beige)] text-[var(--orange)]">
                <Briefcase className="h-6 w-6" />
              </div>
              <div className="flex gap-2">
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                  service.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  {service.is_active ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                  {service.is_active ? 'Active' : 'Hidden'}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-serif text-2xl text-[var(--charcoal)] mb-2">{service.name}</h3>
              <p className="text-lg font-bold text-[var(--orange)] mb-4">₦{service.price}</p>
              <p className="text-sm text-[var(--charcoal)]/60 leading-relaxed line-clamp-2">
                {service.description}
              </p>
            </div>

            <div className="pt-6 border-t border-[#E7E5E4]">
              <ServiceForm service={service} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
