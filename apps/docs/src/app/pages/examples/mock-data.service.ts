import { Injectable } from '@angular/core';
import { MOCK_DATA } from '../../mocks';

@Injectable({ providedIn: 'root' })
export class MockDataService {
	public readonly baseData = MOCK_DATA;
	public readonly reversedData = [...MOCK_DATA].reverse();
	public readonly data = MOCK_DATA.map((item, index) => ({
		...item,
		jv: this.reversedData[index].uv,
		kv: this.reversedData[index].pv,
	}));

	public readonly longerData = [...this.data, ...this.data];
}
