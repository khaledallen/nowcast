Array.prototype.sum = function() {
    return this.reduce( (a,b) => a+b, 0)
}

/****************
 * nowCast
 * data: Number Array
 *  Data is an array of Particulate Matter measurements
 *  for the last 12 hours.
 *  Needs to be sorted from most recent to oldest to conform
 *  with the official NowCast specification.
 * returns NowCast score
 ***************/
function nowCast(data){
    if (data.length != 12){
        throw 'NowCast score requires an array of the last 12 hours.'
    }

    let c_min = Math.min(...data)
    let c_max = Math.max(...data)
    let w_star = c_min / c_max
    let w = w_star > 1/2 ? w_star : 1/2

    // i starts at 0, so we don't need the offset in the official formula
    score = data.map((c,i) => w**(i)*c).sum() / data.map((c,i) => w**(i)).sum() 
    return score
}

/**********
 * The following are some unit tests to check special cases
 */

let d1 = [5,5,5,5,5,5,5,5,5,5,5,5] // should return just the average
let d2 = [3,4,5,4,5,6,5,4,3,4,4,4] // should return sum((1/2)^i c_i)
let d3 = [1]                       // should throw error

console.log("Testing constant reading", nowCast(d1) == (d1).sum()/d1.length)
console.log("Testing w=1/2 approximation", Math.abs(nowCast(d2) - d2.map( (c,i) => (1/2)**(i+1) * c).sum()) < 0.001 )
console.log("Testing error")
console.log(nowCast(d3))
