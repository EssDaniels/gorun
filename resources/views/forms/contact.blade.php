<div class="container">
    <h2>Formularz kontaktowy</h2>
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    <div class="alert alert-success" id="successMessage" style="display:none;"></div>
    <div class="alert alert-danger" id="errorMessage" style="display:none;"></div>
    <form action="{{ route('contact.submit') }}" method="post" enctype="multipart/form-data">
        @csrf
        <div class="form-group">
            <label for="name">Imię i nazwisko:</label>
            <input type="text" class="form-control {{ $errors->has('name') ? 'is-invalid' : '' }}" id="name"
                name="name" value="{{ old('name') }}" required maxlength="100">
            @if ($errors->has('name'))
                <div class="invalid-feedback">{{ $errors->first('name') }}</div>
            @endif
        </div>
        <div class="form-group">
            <label for="phone">Numer telefonu:</label>
            <input type="tel" class="form-control {{ $errors->has('phone') ? 'is-invalid' : '' }}" id="phone"
                name="phone" value="{{ old('phone') }}" required pattern="\d*" title="Tylko cyfry są akceptowane."
                maxlength="16">
            @if ($errors->has('phone'))
                <div class="invalid-feedback">{{ $errors->first('phone') }}</div>
            @endif
        </div>
        <div class="form-group">
            <label for="email">Adres e-mail:</label>
            <input type="email" class="form-control {{ $errors->has('email') ? 'is-invalid' : '' }}" id="email"
                name="email" value="{{ old('email') }}" required>
            @if ($errors->has('email'))
                <div class="invalid-feedback">{{ $errors->first('email') }}</div>
            @endif
        </div>
        <div class="form-group">
            <label for="message">Treść wiadomości:</label>
            <textarea rows="9" class="form-control {{ $errors->has('message') ? 'is-invalid' : '' }}" id="message"
                name="message" required maxlength="500">{{ old('message') }}</textarea>
            <div id="message-counter" class="text-muted">
                0 / 500 znaków
            </div>
            @if ($errors->has('message'))
                <div class="invalid-feedback">{{ $errors->first('message') }}</div>
            @endif
        </div>
        <div class="form-group">
            <label for="attachment">Załącznik:</label>
            <input type="file" class="form-control-file {{ $errors->has('attachment') ? 'is-invalid' : '' }}"
                id="attachment" name="attachment" required accept=".jpg,.pdf">
            @if ($errors->has('attachment'))
                <div class="invalid-feedback d-block">{{ $errors->first('attachment') }}</div>
            @endif
        </div>
        <button type="submit" class="btn btn-primary">Wyślij</button>
    </form>
</div>
