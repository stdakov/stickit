<html class="no-js" xmlns="http://www.w3.org/1999/xhtml" lang="bg" prefix="og: http://ogp.me/ns#">

<head>
    <!-- Bootstrap core CSS -->
    <link href="/media/bootstrap.min.css" rel="stylesheet">
    <link href="/media/style.css" rel="stylesheet">
    <meta charset="utf-8" />
    <title>Stick It</title>


    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    <meta name="viewport" content="width=device-width" />
    <meta name="description" content="Store notes in your browser." />
</head>

<body>
    <div class="form-sticky">
        <div class="page-header">
            <h1 id="containers">Stick it</h1>
        </div>
        <div class="card border-secondary mb-3">
            <form>
                <div class="card-header"><input type="text" class="form-control" id="headerInput" placeholder="Header..."></div>
                <div class="card-body">
                    <div class="form-group">
                        <textarea class="form-control" id="bodyInput" rows="5" placeholder="Body ..."></textarea>
                    </div>
                    <fieldset class="form-group">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input radio-primary" type="radio" checked name="inlineRadioOptions" value="primary">
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input radio-secondary" type="radio" name="inlineRadioOptions" value="secondary">
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input radio-success" type="radio" name="inlineRadioOptions" value="success">
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input radio-danger" type="radio" name="inlineRadioOptions" value="danger">
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input radio-warning" type="radio" name="inlineRadioOptions" value="warning">
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input radio-info" type="radio" name="inlineRadioOptions" value="info">
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input radio-white" type="radio" name="inlineRadioOptions" value="white">
                        </div>
                    </fieldset>
                    <button type="submit" class="btn btn-primary float-right">Add</button>
                </div>
            </form>
        </div>
    </div>
    <div class="container-fluid">

        <div class="row">
            <div class="card-columns">

            </div>
        </div>
    </div>
    <footer class="text-muted">
        <div class="container">
            <span class="text-muted">created by <a href="https://twitter.com/StanislavDakov" target="_blank">@StanislavDakov</a></span>
            <span class="text-muted float-right">open source project at <a href="https://github.com/stdakov/stickit" target="_blank">github</a></span>
        </div>
    </footer>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="exampleModalBody"></p>
                </div>
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script type="text/javascript" src="/media/bootstrap-4.5.3-dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/media/scripts.js"></script>
</body>

</html>