// types/service-worker.d.ts

declare let self: ServiceWorkerGlobalScope;

interface ServiceWorkerGlobalScope {
  __WB_MANIFEST: Array<{ url: string; revision: string | null }>;
}
