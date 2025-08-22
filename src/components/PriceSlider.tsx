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
			<div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
				<div className="mb-4">
					<h3 className="text-lg font-bold text-gray-900 mb-2">Price Range</h3>
					<div className="text-2xl font-bold text-gray-900">
						¥{localMin.toLocaleString()} - ¥{localMax.toLocaleString()}
					</div>
				</div>
				<div className="relative h-2 bg-gray-200 rounded-full">
					{/* 選択範囲の背景 */}
					<div
						className="absolute h-full bg-blue-500 rounded-full"
						style={{
							left: `${getMinPosition()}%`,
							width: `${getMaxPosition() - getMinPosition()}%`,
						}}
					/>
					{/* 最小値ハンドル */}
					<div
						className={`absolute top-1/2 w-5 h-5 bg-blue-500 border-2 border-white rounded-full shadow-lg transform -translate-y-1/2 -translate-x-1/2 cursor-pointer transition-all ${
							isDragging === "min" ? "scale-110 ring-2 ring-blue-200" : "hover:scale-105"
						}`}
						style={{ left: `${getMinPosition()}%` }}
						onMouseDown={() => handleMouseDown("min")}
					/>
					{/* 最大値ハンドル */}
					<div
						className={`absolute top-1/2 w-5 h-5 bg-blue-500 border-2 border-white rounded-full shadow-lg transform -translate-y-1/2 -translate-x-1/2 cursor-pointer transition-all ${
							isDragging === "max" ? "scale-110 ring-2 ring-blue-200" : "hover:scale-105"
						}`}
						style={{ left: `${getMaxPosition()}%` }}
						onMouseDown={() => handleMouseDown("max")}
					/>
				</div>
			</div>
		</div>
	);
} 