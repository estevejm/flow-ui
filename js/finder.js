(function (flow, $, d3, PubSub) {

    PubSub.subscribe('node.find', function (msg, nodeId) {
        var selectedNode = document.getElementById(nodeId);

        if (selectedNode !== null) {
            scrollToNode(selectedNode);
        }

        temporaryFadeAllExcept(nodeId);
    });

    function scrollToNode(node) {
        $('html, body').animate({
            scrollTop: $(node).offset().top - (flow.canvas.height/2)
        }, 500);
    }

    function temporaryFadeAllExcept(nodeId) {
        var nodes = d3.selectAll(".node:not(#" + nodeId + ")");
        var labels = d3.selectAll(".label:not([data-for-node='" + nodeId + "'])");
        var links = d3.selectAll(".link");

        nodes.style("opacity", "0");
        labels.style("opacity", "0");
        links.style("opacity", "0");

        d3.selectAll(".node, .link, .label")
            .transition()
            .duration(2000)
            .style("opacity", 1);
    }

}(flow, jQuery, d3, PubSub));