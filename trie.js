

Trie = function() {
	this._values = [];
}

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