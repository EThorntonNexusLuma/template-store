import React from "react";

type LegalProps = {
  privacyOpen: boolean;
  termsOpen: boolean;
  contactOpen: boolean;
  onClosePrivacy: () => void;
  onCloseTerms: () => void;
  onCloseContact: () => void;
};

function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-[min(92vw,680px)] max-h-[85vh] overflow-auto rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-700 px-3 py-1 text-sm text-gray-300 hover:bg-gray-800 min-h-[36px]"
            aria-label="Close"
          >
            Close
          </button>
        </div>
        <div className="mt-4 text-sm leading-relaxed text-gray-300">{children}</div>
      </div>
    </div>
  );
}

export const LegalModals: React.FC<LegalProps> = (props) => {
  return (
    <>
      <Modal open={props.privacyOpen} title="Privacy Policy" onClose={props.onClosePrivacy}>
        <p>
          We value your privacy. This website collects minimal information needed to provide our services.
          Data you provide at checkout is processed securely by our payment provider. We never sell your data.
        </p>
        <p className="mt-3">
          For removal or access requests, contact us via the form on the site. Continued use of the site
          constitutes acceptance of this policy.
        </p>
      </Modal>

      <Modal open={props.termsOpen} title="Terms of Service" onClose={props.onCloseTerms}>
        <p>
          By using this site, you agree not to misuse the services, attempt to break security, or infringe
          intellectual property. All templates are licensed for the customer&apos;s use according to the
          plan purchased.
        </p>
        <p className="mt-3">
          Services are provided &quot;as is&quot; without warranty. Limitation of liability applies to the
          maximum extent permitted by law.
        </p>
      </Modal>

      <Modal open={props.contactOpen} title="Contact Us" onClose={props.onCloseContact}>
        <p>
          Need help? Send us a message and we&apos;ll get back shortly. You can also reach out via the social
          links in the footer.
        </p>
      </Modal>
    </>
  );
};