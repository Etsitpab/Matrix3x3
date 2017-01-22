(function () {
     'use strict';
     function Matrix (a1, a2) {
         this.width = a1 || 3;
         this.data = new Float64Array(a2 || (a1 * 3) || 9);
     }

     Matrix.zeros = function (h, w) {
         return new Matrix(w || h);
     };

     Matrix.eye = function () {
         return new Matrix([1, 0, 0, 0, 1, 0, 0, 0, 1]);
     };

     Matrix.rand = function (w) {
         var mOut = new Matrix(w), d = mOut.data;
         var i, ie, rand = Math.random;
         for (i = 0, ie = d.length; i < ie; i++) {
             d[i] = rand();
         }
         return mOut;
     };

     Matrix.prototype.getData = function () {
        return this.data;
     };

     Matrix.prototype.det = function () {
         var d = this.data;
         return d[0] * d[4] * d[8] + d[1] * d[5] * d[6] +
                d[2] * d[3] * d[7] - d[2] * d[4] * d[6] -
                d[5] * d[7] * d[0] - d[8] * d[1] * d[3];
     };

     Matrix.prototype.inv = function () {
         var det = this.det(), iDet = 1 / det;
         if (det === 0) {
             throw new Error('Matrix.inv(): Determinant is null, matrix can\'t be inverted !');
         }

         var iMat = new Matrix();
         var d = this.data, id = iMat.data;
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

     Matrix.prototype.times = function (m2) {
         var w, we;
         var mOut = Matrix.zeros(3, m2.width);
         var dOut = mOut.data, d = this.data, d2 = m2.data;
         var d00 = d[0], d01 = d[3],  d02 = d[6];
         var d10 = d[1], d11 = d[4],  d12 = d[7];
         var d20 = d[2], d21 = d[5],  d22 = d[8];
         for (w = 0, we = m2.width * 3; w < we; w += 3) {
             var a = d2[w], b = d2[w + 1], c = d2[w + 2];
             dOut[w]     = d00 * a + d01 * b + d02 * c;
             dOut[w + 1] = d10 * a + d11 * b + d12 * c;
             dOut[w + 2] = d20 * a + d21 * b + d22 * c;
         }
         return mOut;
     };

     Matrix.prototype.toString = function () {
     };
})();
