"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Time from "@/components/digit-time";
import Calendar from "@/components/calendar";
import { useSession, signIn, signOut } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import LandscapeComponent from "@/components/landscape";
import RandomQuote from "@/components/random-quote";
import { FilePenLine } from "lucide-react";
import { getSheetData } from "@/actions/google-sheets.action";
import { signData } from "@/type/glsheet";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  const [browserSupport, setBrowserSupport] = useState<boolean>(false);
  const [userDenied, setUserDenied] = useState<boolean>(true);
  const { data: session, status } = useSession();
  const [systemStatusContext, setSystemStatusContext] = useState<"in" | "out">(
    new Date().getHours() < 12 ? "in" : "out"
  );
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      setBrowserSupport(true);
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          setUserDenied(false);
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              if (position) {
                setUserDenied(false);
              }
            },
            (error) => {
              toast({
                variant: "destructive",
                title: "Can't get your location",
                description: "Please allow location access to use this app",
                action: (
                  <ToastAction
                    onClick={() => {
                      navigator.geolocation.getCurrentPosition(
                        () => {},
                        () => {}
                      );
                    }}
                    altText="Understand"
                  >
                    understand
                  </ToastAction>
                ),
                duration: 10000,
              });
              console.error("Error getting user location:", error);
            }
          );
        } else if (result.state === "denied") {
          toast({
            variant: "destructive",
            title: "Location access denied",
            description: "Please allow location access to use this app",
            action: (
              <ToastAction
                onClick={() => {
                  navigator.geolocation.getCurrentPosition(
                    () => {},
                    () => {}
                  );
                }}
                altText="Understand"
              >
                understand
              </ToastAction>
            ),
            duration: 10000,
          });
        }
      });
    } else {
      console.log("geolocation is not available");
    }
    return () => {};
  }, []);

  const handleOnGetSheetDataClick = async () => {
    setSubmitting(true);
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    async function success(pos: GeolocationPosition) {
      const crd: GeolocationCoordinates = pos.coords;
      if (session?.user?.email) {
        const timestamp: string = new Date().toLocaleString("TH-th");
        const req: signData = {
          timestamp: timestamp,
          email: session.user.email,
          status: systemStatusContext,
          accuracy: crd.accuracy,
          latitude: crd.latitude,
          longitude: crd.longitude,
          altitude: crd.altitude,
          heading: crd.heading,
          speed: crd.speed,
          linkmap: `https://www.google.com/maps/place/${crd?.latitude},${crd?.longitude}`,
        };
        const response = await getSheetData(req);
        toast({
          title: `Check ${systemStatusContext} success`,
          description: `Successfully check ${systemStatusContext} at ${timestamp}`,
          action: <ToastAction altText="OK">OK!</ToastAction>,
        });
      }
      setSubmitting(false);
    }

    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      setSubmitting(false);
    }

    try {
      navigator.geolocation.getCurrentPosition(success, error, options);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  if (status === `loading`) {
    return (
      <main className=" flex flex-col justify-center h-screen w-screen">
        <div className="flex flex-row flex-wrap self-center justify-center gap-4 max-w-xs"></div>
        <div className="flex flex-col space-y-3 self-center">
          <Skeleton className="h-16 w-[250px]" />
          <Skeleton className="h-[280px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className=" flex flex-col justify-center h-screen w-screen">
        <div className="flex flex-row flex-wrap self-center justify-center gap-4 max-w-xs">
          <LandscapeComponent />
          <RandomQuote />
        </div>
      </main>
    );
  }

  if (userDenied) {
    return (
      <main className=" flex flex-col justify-center h-screen w-screen">
        <div className="flex flex-row flex-wrap self-center justify-center gap-4 max-w-xs">
          You must allow location access to use this app
        </div>
      </main>
    );
  }

  return (
    <main className=" flex flex-col justify-center h-screen w-screen">
      <div className="flex flex-row flex-wrap self-center justify-center gap-4 max-w-xs">
        <div className="flex flex-col">
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden">
              <div
                className={`transition-all duration-500 ease-in-out ${
                  submitting ? " translate-y-20" : "translate-y-0"
                }`}
              >
                <Time />
              </div>
            </div>
            <div className="w-full flex justify-center">
              <Button
                disabled={submitting}
                className={`gap-2 transition-all duration-700 ease-in-out ${
                  submitting
                    ? "animate-bounce bg-slate-800 text-white w-36"
                    : "w-full animate-none bg-white text-black"
                }`}
                onClick={handleOnGetSheetDataClick}
              >
                {submitting ? (
                  <div className="flex gap-2">
                    <Spinner className="text-black" size={"small"} show />
                    <div className="flex flex-col h-full justify-center">
                      <p>Checking {systemStatusContext} ...</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <FilePenLine className="mr-2" size={16} />
                    <span>Check {systemStatusContext}</span>
                  </div>
                )}
              </Button>
            </div>
            <div className=" overflow-hidden">
              <div
                className={`transition-all duration-700 ease-in-out ${
                  submitting ? " translate-y-[-20rem]" : "translate-y-0"
                }`}
              >
                <Calendar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
