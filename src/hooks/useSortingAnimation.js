import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Hook central que gerencia toda a lógica de animação do sorting.
 * O visualizador só precisa renderizar — toda a lógica fica aqui.
 *
 * @param {Array} steps - Lista de steps gerada pelo algoritmo
 */
export function useSortingAnimation(steps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(150); // ms por step (menor = mais rápido)
  const intervalRef = useRef(null);

  const totalSteps = steps?.length ?? 0;
  const isFinished = currentStep >= totalSteps - 1;

  // Limpa o intervalo ao desmontar
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Inicia/pausa o intervalo conforme isPlaying
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

  // Quando os steps mudam (novo algoritmo ou novo array), reseta tudo
  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
    clearInterval(intervalRef.current);
  }, [steps]);

  const play = useCallback(() => {
    if (isFinished) reset();
    setIsPlaying(true);
  }, [isFinished]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

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
