"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  MapPin,
  Clock,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ExperienceStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  stats: { label: string; value: string }[];
}

export default function ExperienceSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const experiences: ExperienceStep[] = [
    {
      id: "discover",
      title: "Discover Your Perfect Ride",
      description:
        "Explore our curated collection of premium bicycles designed for every adventure and lifestyle.",
      icon: <MapPin className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
      stats: [
        { label: "Bike Models", value: "500+" },
        { label: "Categories", value: "12" },
        { label: "Brands", value: "25+" },
      ],
    },
    {
      id: "customize",
      title: "Customize & Personalize",
      description:
        "Make it yours with our advanced customization options and premium accessories.",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500",
      stats: [
        { label: "Custom Options", value: "1000+" },
        { label: "Accessories", value: "200+" },
        { label: "Colors", value: "50+" },
      ],
    },
    {
      id: "experience",
      title: "Experience the Journey",
      description:
        "Join our community of passionate cyclists and embark on unforgettable adventures.",
      icon: <Users className="h-6 w-6" />,
      color: "from-green-500 to-teal-500",
      stats: [
        { label: "Happy Riders", value: "10K+" },
        { label: "Miles Covered", value: "1M+" },
        { label: "Adventures", value: "500+" },
      ],
    },
  ];

  useEffect(() => {
    if (isInView && !isPlaying) {
      setIsPlaying(true);
    }
  }, [isInView, isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setActiveStep((prev) => (prev + 1) % experiences.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, experiences.length]);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section ref={containerRef} className="relative  overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          style={{ y, opacity }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], [-50, 150]),
            opacity,
          }}
          className="absolute bottom-20 right-10 w-96 h-96 text-white bg-gradient-to-r from-navy-blue to-teal-500 hover:from-teal-500 hover:to-navy-blue rounded-full blur-3xl"
        />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold md:text-4xl gradient-text mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
           Interactive Experience
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Immerse yourself in the world of premium cycling with our interactive experience
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Video/Visual Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <video
                ref={videoRef}
                className="w-full h-[400px] object-cover"
                loop
                muted={isMuted}
                playsInline
                poster="/placeholder.svg?height=400&width=600"
              >
                <source src="/cycling-video.mp4" type="video/mp4" />
              </video>

              {/* Video Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Video Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/30"
                    onClick={toggleVideo}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/30"
                    onClick={toggleMute}
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/20">
                  Experience the Ride
                </Badge>
              </div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute top-4 right-4"
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2 text-white">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Live Experience
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-4 -right-4 w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full shadow-lg"
            />
          </motion.div>

          {/* Interactive Steps Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative cursor-pointer transition-all duration-500 ${
                  activeStep === index ? "scale-105" : "hover:scale-102"
                }`}
                onClick={() => setActiveStep(index)}
              >
                <Card
                  className={`overflow-hidden transition-all duration-500 ${
                    activeStep === index
                      ? "shadow-xl border-2 border-navy-blue-200 "
                      : "shadow-md hover:shadow-lg"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${experience.color} text-white shadow-lg`}
                      >
                        {experience.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">
                          {experience.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {experience.description}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                          {experience.stats.map((stat, statIndex) => (
                            <div key={statIndex} className="text-center">
                              <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 0.5,
                                  delay: statIndex * 0.1,
                                }}
                                className="text-2xl font-bold gradient-text"
                              >
                                {stat.value}
                              </motion.div>
                              <div className="text-xs text-muted-foreground">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {activeStep === index && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-1 text-white bg-gradient-to-r from-navy-blue to-teal-500 hover:from-teal-500 "
                      />
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-6"
            >
              <Button className="w-full text-white bg-gradient-to-r from-navy-blue to-teal-500 hover:from-teal-500 hover:to-navy-blue shadow-lg">
                Start Your Journey
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="ml-2"
                >
                  →
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
