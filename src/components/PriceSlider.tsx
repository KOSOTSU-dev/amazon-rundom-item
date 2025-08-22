"use client";
import { useState, useEffect, useCallback } from "react";

interface PriceSliderProps {
	minPrice: number;
	maxPrice: number;
	onChange: (min: number, max: number) => void;
}

export default function PriceSlider({ minPrice, maxPrice, onChange }: PriceSliderProps) {
	const [localMin, setLocalMin] = useState(minPrice);
	const [localMax, setLocalMax] = useState(maxPrice);
	const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);

	// 価格範囲の設定
	const priceRange = {
		min: 1,
		max: 10000,
		step: 100,
	};

	useEffect(() => {
		setLocalMin(minPrice);
		setLocalMax(maxPrice);
	}, [minPrice, maxPrice]);

	const handleMinChange = (value: number) => {
		const newMin = Math.min(value, localMax - priceRange.step);
		setLocalMin(newMin);
		onChange(newMin, localMax);
	};

	const handleMaxChange = (value: number) => {
		const newMax = Math.max(value, localMin + priceRange.step);
		setLocalMax(newMax);
		onChange(localMin, newMax);
	};

	const getMinPosition = () => {
		return ((localMin - priceRange.min) / (priceRange.max - priceRange.min)) * 100;
	};

	const getMaxPosition = () => {
		return ((localMax - priceRange.min) / (priceRange.max - priceRange.min)) * 100;
	};

	const handleMouseDown = (type: "min" | "max") => {
		setIsDragging(type);
	};

	const handleMouseMove = useCallback((e: MouseEvent) => {
		if (!isDragging) return;

		const target = e.target as HTMLElement;
		const rect = target.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
		const value = Math.round(
			priceRange.min + (percentage / 100) * (priceRange.max - priceRange.min)
		);

		if (isDragging === "min") {
			handleMinChange(value);
		} else {
			handleMaxChange(value);
		}
	}, [isDragging, localMin, localMax, priceRange]);

	const handleMouseUp = useCallback(() => {
		setIsDragging(null);
	}, []);

	useEffect(() => {
		if (isDragging) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
			return () => {
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
			};
		}
	}, [isDragging, handleMouseMove, handleMouseUp]);

	return (
		<div className="w-full">
			<div className="mb-2">
				<label className="text-sm font-medium text-gray-700">価格</label>
				<div className="text-lg font-bold text-gray-900">
					¥{localMin.toLocaleString()} ~ ¥{localMax.toLocaleString()}
				</div>
			</div>
			<div className="relative h-6 bg-gray-200 rounded-full cursor-pointer">
				{/* 選択範囲の背景 */}
				<div
					className="absolute h-full bg-teal-600 rounded-full"
					style={{
						left: `${getMinPosition()}%`,
						width: `${getMaxPosition() - getMinPosition()}%`,
					}}
				/>
				{/* 最小値ハンドル */}
				<div
					className={`absolute top-1/2 w-6 h-6 bg-teal-600 border-2 border-white rounded-full shadow-md transform -translate-y-1/2 -translate-x-1/2 cursor-pointer ${
						isDragging === "min" ? "ring-2 ring-teal-300" : ""
					}`}
					style={{ left: `${getMinPosition()}%` }}
					onMouseDown={() => handleMouseDown("min")}
				/>
				{/* 最大値ハンドル */}
				<div
					className={`absolute top-1/2 w-6 h-6 bg-teal-600 border-2 border-white rounded-full shadow-md transform -translate-y-1/2 -translate-x-1/2 cursor-pointer ${
						isDragging === "max" ? "ring-2 ring-teal-300" : ""
					}`}
					style={{ left: `${getMaxPosition()}%` }}
					onMouseDown={() => handleMouseDown("max")}
				/>
			</div>
		</div>
	);
} 