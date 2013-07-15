/**
 * Trie.js
 *
 * @author Martin Fillafer (unki2aut@gmail.com)
 *
 * Simple implementation of a trie structure in Javascript.
 * ref: http://en.wikipedia.org/wiki/Trie
 */

Trie = function() {
	this._values = [];
}

/**
 * Add a key-value-pair to the trie
 * @param {string} key - key to serach for
 * @param {object} value - any object you want find by the key
 */
Trie.prototype.put = function( key, value ) {
	this._put( key.toLowerCase().split(""), value );
}
Trie.prototype._put = function( letters, value ) {
	var l = letters.shift();

	if( l ) {
		if( !(l in this) ) {
			this[l] = new Trie();
		}
		this[l]._put( letters, value );
	} else {
		this._values.push( value );
	}
}

/**
 * Find a list of values starting with the key letters
 * @param {string} key - key to serach for
 * @returns {array} - returns a list of all the values with the same starting letters as the key
 */
Trie.prototype.get = function( key ) {
	return this._get( key.toLowerCase().split("") );
}

Trie.prototype._get = function( letters ) {
	var l = (letters || []).shift(), res = [];

	if( l ) {
		if( l in this) {
			res = this[l]._get( letters );
		}
	} else {
		res = res.concat(this._values);
		
		for(key in this) {
			if(this[key] instanceof Trie) {
				res = res.concat( this[key]._get() );
			}
		}
	}

	return res;
}