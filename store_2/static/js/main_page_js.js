/**
 * Created by Maee on 12/27/13.
 */

;
document.getElementById("frst_select").change(function() {
    alert("change")
    var select = document.getElementById("snd_select");
    while(select.hasChildNodes()){
        select.removeChild(select.firstChild);
    }
    var op = document.getElementById($(this).val());
    var id = op.id;

});
