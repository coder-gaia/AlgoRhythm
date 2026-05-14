import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Hook de animação para grafos.
 * Mesmo padrão do useSortingAnimation — consistência é tudo.
 */
export function useGraphAnimation(steps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600); // grafos são mais lentos para ler
  const intervalRef = useRef(null);

  const totalSteps = steps?.length ?? 0;
  const isFinished = currentStep >= totalSteps - 1;

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (isPlaying && !isFinished) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            clearInterval(intervalRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, speed, totalSteps, isFinished]);

  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
    clearInterval(intervalRef.current);
  }, [steps]);

  const play = useCallback(() => {
    if (isFinished) reset();
    setIsPlaying(true);
  }, [isFinished]);

  const pause = useCallback(() => setIsPlaying(false), []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(0);
    clearInterval(intervalRef.current);
  }, []);

  const stepForward = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const stepBackward = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  return {
    currentStep,
    isPlaying,
    isFinished,
    speed,
    totalSteps,
    step: steps?.[currentStep] ?? null,
    play,
    pause,
    reset,
    stepForward,
    stepBackward,
    setSpeed,
    setCurrentStep,
  };
}
