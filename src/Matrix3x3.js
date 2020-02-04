// m1 = new Matrix3x3([3, 3], [
//     0.9337165232903708, 0.31945442440786787, 0.7526080004854352,
//     0.4370670311891329, 0.2252920376588432, 0.6465302648940117,
//     0.6544795314039966, 0.23679223590911214, 0.1847635155308387
// ]);
// m2 = new Matrix3x3([3, 3], [
//     0.12852559545762876, 0.14840015958411912, 0.11697591511006467,
//     0.7530822720260366, 0.3053242653005006, 0.38794504743485736,
//     0.8867451913980329, 0.21629437387803718, 0.3066082584564276
// ]);

export default class Matrix3x3 {
    constructor(size = [3, 3], data = undefined) {
        this._size = size;
        this._data = new Float64Array(size[0] * size[1]);
        if (data) {
            this._data.set(data);
        }
    }
    size(d) {
        return d ? this._size[d] : this._size.slice();
    }
    getData() {
        return this._data;
    }
    det() {
        const d = this._data;
        return d[0] * d[4] * d[8] + d[1] * d[5] * d[6] +
            d[2] * d[3] * d[7] - d[2] * d[4] * d[6] -
            d[5] * d[7] * d[0] - d[8] * d[1] * d[3];
    }

    inv() {
        const det = this.det(), iDet = 1 / det;
        if (det === 0) {
            throw new Error('Matrix3x3.inv(): Determinant is null, matrix can\'t be inverted !');
        }

        const iMat = new Matrix3x3();
        const d = this._data, id = iMat._data;
        id[0] = (d[4] * d[8] - d[7] * d[5]) * iDet;
        id[1] = (d[7] * d[2] - d[1] * d[8]) * iDet;
        id[2] = (d[1] * d[5] - d[4] * d[2]) * iDet;
        id[3] = (d[6] * d[5] - d[3] * d[8]) * iDet;
        id[4] = (d[0] * d[8] - d[6] * d[2]) * iDet;
        id[5] = (d[3] * d[2] - d[0] * d[5]) * iDet;
        id[6] = (d[3] * d[7] - d[6] * d[4]) * iDet;
        id[7] = (d[6] * d[1] - d[0] * d[7]) * iDet;
        id[8] = (d[0] * d[4] - d[3] * d[1]) * iDet;
        return iMat;
    };

    mtimes(m2) {
        const mOut = Matrix3x3.zeros([3, m2.size(1)]), dOut = mOut._data;
        const d = this._data, d2 = m2._data;
        const d00 = d[0], d01 = d[3], d02 = d[6],
              d10 = d[1], d11 = d[4], d12 = d[7],
              d20 = d[2], d21 = d[5], d22 = d[8];
        let w, we = m2.size(1) * 3;
        for (w = 0; w < we; w += 3) {
            const a = d2[w], b = d2[w + 1], c = d2[w + 2];
            dOut[w] = d00 * a + d01 * b + d02 * c;
            dOut[w + 1] = d10 * a + d11 * b + d12 * c;
            dOut[w + 2] = d20 * a + d21 * b + d22 * c;
        }
        return mOut;
    };

    rdivide(m2) {
        const mOut = Matrix3x3.zeros();
        mOut._data.set(this._data.map((v, i) => v / m2._data[i]));
        return mOut;
    };
}

Matrix3x3.zeros = function(...args) {
    return new Matrix3x3(...args);
};

Matrix3x3.eye = function() {
    return new Matrix3x3([3, 3], [1, 0, 0, 0, 1, 0, 0, 0, 1]);
};

Matrix3x3.diag = function(m) {
    return new Matrix3x3([3, 3], [m._data[0], 0, 0, 0, m._data[1], 0, 0, 0, m._data[2]]);
};

Matrix3x3.rand = function(...args) {
    const mOut = new Matrix3x3(...args), d = mOut._data;
    const rand = Math.random;
    let i, ie;
    for (i = 0, ie = d.length; i < ie; i++) {
        d[i] = rand();
    }
    return mOut;
};

Matrix3x3.prototype.toString = function() {};
