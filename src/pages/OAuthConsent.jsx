import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Loader2 } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

export default function OAuthConsent() {
  const [submitting, setSubmitting] = useState(false);
  const [decided, setDecided] = useState("");

  const respond = async (action) => {
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setDecided(action);
    setSubmitting(false);
  };

  if (decided) {
    return (
      <AuthLayout
        icon={ShieldCheck}
        title={decided === "approve" ? "Access granted" : "Access denied"}
        subtitle="You can return to the client and close this window."
      />
    );
  }

  return (
    <AuthLayout
      icon={ShieldCheck}
      title="Authorize access"
      subtitle="An AI client wants to access this app on your behalf"
    >
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1 h-12 font-medium"
          disabled={submitting}
          onClick={() => respond("deny")}
        >
          Deny
        </Button>
        <Button
          className="flex-1 h-12 font-medium"
          disabled={submitting}
          onClick={() => respond("approve")}
        >
          {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          Approve
        </Button>
      </div>
    </AuthLayout>
  );
}
