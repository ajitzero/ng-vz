import { Primitive } from 'd3-array';

export type GapInput = Record<'top' | 'right' | 'bottom' | 'left', number>;
export type InnerBounds = { innerWidth: number; innerHeight: number };
export type DataPointClickEvent = { data: Record<string, Primitive>; key: string };

export type LineChartSettings = {
	skipSmoothing: boolean;
};
